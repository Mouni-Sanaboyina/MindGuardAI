import React, { useState, useRef, useCallback } from 'react'
import {
  FileText, Mic, ImageIcon, Video, Upload, Search, X, AlertCircle,
  CheckCircle, AlertTriangle, Clock, Info, ChevronRight, Loader2
} from 'lucide-react'
import { analyseContent } from "../services/api.js";

// ── Constants ─────────────────────────────────────────────────────────────────
const TYPES = [
  {
    id: 'text',
    label: 'Text',
    icon: FileText,
    accept: null,
    hint: 'Plain text up to 10,000 characters'
  },

  {
    id: 'audio',
    label: 'Audio',
    icon: Mic,
    accept: 'audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac,.mpeg',
    hint: 'All audio formats (Max 50MB)'
  },

  {
    id: 'image',
    label: 'Image',
    icon: ImageIcon,
    accept: 'image/*,.jpg,.jpeg,.png,.webp',
    hint: 'Images (Max 20MB)'
  }
]

const HOW_IT_WORKS = [
  { n: 1, icon: FileText, title: 'Select Content Type', desc: 'Choose Text, Audio, Image or Video.' },
  { n: 2, icon: Upload,   title: 'Upload Content',      desc: 'Upload your file or paste your content for analysis.' },
  { n: 3, icon: AlertCircle, title: 'AI Analysis',      desc: 'Our AI models analyze your content for harmful or toxic patterns.' },
  { n: 4, icon: CheckCircle, title: 'Get Results',      desc: 'View detailed scores, categories and recommended action.' },
]

// ── Helpers ────────────────────────────────────────────────────────────────────
function riskColor(level) {
  return { low: '#16a34a', medium: '#ca8a04', high: '#dc2626' }[level] ?? '#64748b'
}
function riskBg(level) {
  return { low: '#f0fdf4', medium: '#fefce8', high: '#fef2f2' }[level] ?? '#f1f5f9'
}
function riskBorder(level) {
  return { low: '#dcfce7', medium: '#fef9c3', high: '#fee2e2' }[level] ?? '#e2e8f0'
}
function barColor(score) {
  if (score >= 65) return '#ef4444'
  if (score >= 35) return '#eab308'
  return '#22c55e'
}
function actionStyle(action) {
  if (action?.includes('Block')) return { color: '#dc2626', bg: '#fef2f2', border: '#fee2e2', icon: '🚫' }
  if (action?.includes('review')) return { color: '#ca8a04', bg: '#fefce8', border: '#fef9c3', icon: '⚠️' }
  return { color: '#16a34a', bg: '#f0fdf4', border: '#dcfce7', icon: '✅' }
}
function formatDate(ms) {
  return new Date(ms).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// ── AnimatedBar ────────────────────────────────────────────────────────────────
function AnimatedBar({ score }) {
  const [w, setW] = React.useState(0)
  React.useEffect(() => { const t = setTimeout(() => setW(score), 80); return () => clearTimeout(t) }, [score])
  return (
    <div style={{ height: 6, background: 'var(--gray-100)', borderRadius: 99, overflow: 'hidden', flex: 1 }}>
      <div style={{
        height: '100%', borderRadius: 99,
        background: barColor(score),
        width: `${w}%`,
        transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
      }} />
    </div>
  )
}

// ── GaugeChart ─────────────────────────────────────────────────────────────────
function Gauge({ score, level }) {
  const [animScore, setAnimScore] = React.useState(0)
  React.useEffect(() => { const t = setTimeout(() => setAnimScore(score), 100); return () => clearTimeout(t) }, [score])
  const r = 54, cx = 80, cy = 80
  const startAngle = 210, endAngle = 330
  const totalAngle = 360 - startAngle + endAngle
  const toRad = d => d * Math.PI / 180
  const arcX = (cx, cy, r, deg) => [cx + r * Math.cos(toRad(deg)), cy + r * Math.sin(toRad(deg))]
  const describeArc = (start, end) => {
    const [sx, sy] = arcX(cx, cy, r, start)
    const [ex, ey] = arcX(cx, cy, r, end)
    const large = (end - start + 360) % 360 > 180 ? 1 : 0
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`
  }
  const filled = startAngle + (totalAngle * animScore / 100)
  const color = riskColor(level)

  return (
    <svg width={160} height={120} style={{ overflow: 'visible' }}>
      <path d={describeArc(startAngle, startAngle + totalAngle)} fill="none" stroke="var(--gray-100)" strokeWidth={10} strokeLinecap="round" />
      <path d={describeArc(startAngle, filled)} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round"
        style={{ transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
      <text x={cx} y={cy + 8} textAnchor="middle" fill={color} fontSize={22} fontWeight={700} fontFamily="DM Sans">{(animScore / 100).toFixed(2)}</text>
      <text x={cx} y={cy + 26} textAnchor="middle" fill="var(--gray-400)" fontSize={10} fontFamily="DM Sans">/ 1.00</text>
      <text x={32} y={cy + 46} fill="var(--gray-300)" fontSize={8} fontFamily="DM Sans">0</text>
      <text x={122} y={cy + 46} fill="var(--gray-300)" fontSize={8} fontFamily="DM Sans">1</text>
    </svg>
  )
}

// ── UploadDropzone ─────────────────────────────────────────────────────────────
function UploadDropzone({ type, file, onFile }) {
  const inputRef = useRef(null)
  const cfg = TYPES.find(t => t.id === type)
  const [drag, setDrag] = React.useState(false)

  const handleDrop = useCallback(e => {
    e.preventDefault(); setDrag(false)
    const f = e.dataTransfer.files?.[0]; if (f) onFile(f)
  }, [onFile])

  if (file) return (
    <div style={{ border: '1.5px solid var(--blue-500)', borderRadius: 'var(--radius)', padding: '14px 16px', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', gap: 12 }}>
      <cfg.icon size={18} color="var(--blue-600)" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--gray-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Selected file for upload</div>
      </div>
      <button onClick={() => onFile(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', padding: 4 }}><X size={15} /></button>
    </div>
  )

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      style={{
        border: `1.5px dashed ${drag ? 'var(--blue-500)' : 'var(--gray-300)'}`,
        borderRadius: 'var(--radius)', padding: '28px 16px',
        textAlign: 'center', cursor: 'pointer',
        background: drag ? 'var(--blue-50)' : 'var(--gray-50)',
        transition: 'all 0.15s',
      }}
    >
      <Upload size={20} color="var(--gray-400)" style={{ margin: '0 auto 8px' }} />
      <div
        style={{
          fontSize: "0.85rem",
          color: "var(--gray-600)",
          fontWeight: 500,
        }}
      >
        Drag & Drop {cfg.label} File or Click to Upload
        <br />
        <small>
          Supported: {cfg.accept || "Any"}
        </small>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={cfg.accept}
        style={{ display: 'none' }}
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </div>
  )
}

// ── Result Panel ───────────────────────────────────────────────────────────────
function ResultPanel({ result }) {
  const level = result.risk_level
  const as = actionStyle(result.recommended_action)
  const flaggedCats = Object.entries(result.categories).filter(([, v]) => v >= 35)

  return (
    <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Status + time */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ padding: '3px 10px', borderRadius: 99, background: '#f0fdf4', color: '#16a34a', fontSize: '0.75rem', fontWeight: 600, border: '1px solid #dcfce7' }}>Completed</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Analyzed in {(result.processing_time_ms / 1000).toFixed(1)}s</span>
        </div>
      </div>

      {/* Toxicity score + gauge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            Toxicity Score <Info size={13} color="var(--gray-400)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: riskColor(level), lineHeight: 1 }}>
            {(result.risk_score / 100).toFixed(2)}
            <span style={{ fontSize: '1rem', color: 'var(--gray-400)', fontWeight: 400 }}> / 1.00</span>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            marginTop: 6, padding: '3px 10px', borderRadius: 99,
            background: riskBg(level), border: `1px solid ${riskBorder(level)}`,
            color: riskColor(level), fontSize: '0.75rem', fontWeight: 600,
          }}>
            {{ low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' }[level]}
          </div>
        </div>
        <Gauge score={result.risk_score} level={level} />
      </div>

      {/* Flagged categories */}
      {flaggedCats.length > 0 && (
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            Flagged Categories <Info size={13} color="var(--gray-400)" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {flaggedCats.map(([cat, score]) => (
              <span key={cat} style={{
                padding: '4px 10px', borderRadius: 6,
                background: score >= 65 ? '#fef2f2' : '#fefce8',
                color: score >= 65 ? '#dc2626' : '#ca8a04',
                border: `1px solid ${score >= 65 ? '#fee2e2' : '#fef9c3'}`,
                fontSize: '0.75rem', fontWeight: 600,
              }}>
                {cat.replace(/_/g, ' ')} {(score / 100).toFixed(2)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Transcript */}
      {result.transcript && result.transcript !== '[No speech detected]' && (
        <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', background: 'var(--gray-50)', border: '1px solid var(--gray-200)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)', marginBottom: 4 }}>TRANSCRIPT</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--gray-700)', lineHeight: 1.6, maxHeight: 80, overflowY: 'auto' }}>{result.transcript}</div>
        </div>
      )}

      {/* Timestamps */}
      {result.timestamps?.length > 0 && (
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: 8 }}>Timeline Report</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 140, overflowY: 'auto' }}>
            {result.timestamps.map((ts, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                background: ts.score >= 65 ? '#fef2f2' : '#fefce8',
                border: `1px solid ${ts.score >= 65 ? '#fee2e2' : '#fef9c3'}`,
                cursor: 'pointer',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ts.score >= 65 ? '#ef4444' : '#eab308', flexShrink: 0 }} />
                <span style={{ fontFamily: 'DM Mono', fontSize: '0.78rem', color: 'var(--gray-500)', flexShrink: 0 }}>{ts.time}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--gray-700)', flex: 1 }}>{ts.label}</span>
                <ChevronRight size={13} color="var(--gray-400)" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Risk Report Bottom Section ─────────────────────────────────────────────────
function RiskReport({ result }) {
  const level = result.risk_level
  const as = actionStyle(result.recommended_action)
  const cols = Object.entries(result.categories)

  return (
    <div className="animate-in" style={{ marginTop: 20, padding: 20, borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', background: 'var(--white)' }}>
      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gray-800)', marginBottom: 4 }}>Risk Report</h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: 16 }}>Overview of the content risk with category breakdown and recommended action.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {/* Overall score */}
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-500)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
            Overall Risk Score <Info size={12} color="var(--gray-400)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: riskColor(level), lineHeight: 1 }}>
            {(result.risk_score / 100).toFixed(2)}
            <span style={{ fontSize: '1rem', color: 'var(--gray-400)', fontWeight: 400 }}> / 1.00</span>
          </div>
          <div style={{
            display: 'inline-flex', marginTop: 8, padding: '3px 10px', borderRadius: 99,
            background: riskBg(level), border: `1px solid ${riskBorder(level)}`,
            color: riskColor(level), fontSize: '0.73rem', fontWeight: 600,
          }}>
            {{ low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' }[level]}
          </div>
        </div>

        {/* Category breakdown */}
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-500)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
            Category Breakdown <Info size={12} color="var(--gray-400)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {cols.slice(0, 5).map(([cat, val]) => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)', width: 90, flexShrink: 0, textTransform: 'capitalize' }}>
                  {cat.replace(/_/g, ' ')}
                </span>
                <AnimatedBar score={val} />
                <span style={{ fontSize: '0.73rem', fontFamily: 'DM Mono', color: 'var(--gray-500)', width: 30, textAlign: 'right' }}>
                  {(val / 100).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended action */}
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-500)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
            Recommended Action <Info size={12} color="var(--gray-400)" />
          </div>
          <div style={{ textAlign: 'center', paddingTop: 8 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>{as.icon}</div>
            <div style={{
              display: 'inline-block', padding: '6px 16px', borderRadius: 8,
              background: as.bg, border: `1.5px solid ${as.border}`,
              color: as.color, fontSize: '0.85rem', fontWeight: 700, marginBottom: 8,
            }}>
              {result.recommended_action}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
              {result.recommended_action.includes('Block')
                ? 'This content violates our community guidelines and should not be published.'
                : result.recommended_action.includes('review')
                ? 'This content requires human review before publishing.'
                : 'This content appears safe to publish.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Recent Analyses Table ──────────────────────────────────────────────────────
function RecentTable({ analyses }) {
  if (!analyses.length) return null
  return (
    <div style={{ marginTop: 20, padding: 20, borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', background: 'var(--white)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gray-800)' }}>Recent Analyses</h3>
        <button style={{ fontSize: '0.8rem', color: 'var(--blue-600)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
          View All Analyses →
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
            {['ID', 'Type', 'Preview', 'Score', 'Risk Level', 'Action', 'Date'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '0 12px 10px', fontSize: '0.75rem', color: 'var(--gray-500)', fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {analyses.map((row, i) => {
            const TypeIcon = TYPES.find(t => t.id === row.type)?.icon ?? FileText
            const as = actionStyle(row.action)
            const levelColor = riskColor(row.level)
            const levelBg = riskBg(row.level)
            return (
              <tr key={i} style={{ borderBottom: '1px solid var(--gray-50)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '10px 12px', fontSize: '0.8rem', color: 'var(--gray-500)', fontFamily: 'DM Mono' }}>{row.id}</td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TypeIcon size={14} color="var(--gray-500)" />
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray-700)', textTransform: 'capitalize' }}>{row.type}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 12px', fontSize: '0.8rem', color: 'var(--gray-600)', maxWidth: 200 }}>
                  <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.preview}</span>
                </td>
                <td style={{ padding: '10px 12px', fontSize: '0.82rem', fontWeight: 600, color: levelColor, fontFamily: 'DM Mono' }}>{(row.score / 100).toFixed(2)}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '3px 8px', borderRadius: 99, background: levelBg, color: levelColor, fontSize: '0.72rem', fontWeight: 600, border: `1px solid ${riskBorder(row.level)}`, textTransform: 'capitalize' }}>
                    {row.level.charAt(0).toUpperCase() + row.level.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ fontSize: '0.78rem', color: as.color, fontWeight: 600 }}>{row.action}</span>
                </td>
                <td style={{ padding: '10px 12px', fontSize: '0.75rem', color: 'var(--gray-400)', whiteSpace: 'nowrap' }}>{row.date}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeType, setActiveType] = useState('text')
  const [inputText, setInputText] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [analyses, setAnalyses] = useState([])
  const [analysisCount, setAnalysisCount] = useState(1024)
  const fileInputRef = useRef(null)

  const canAnalyse = activeType === 'text' ? inputText.trim().length > 0 : file !== null

  const handleTypeChange = id => {
    setActiveType(id); setResult(null); setError(null); setFile(null); setInputText('')
  }

  const handleAnalyse = async () => {
    if (!canAnalyse || loading) return
    setLoading(true); setResult(null); setError(null)
    const start = Date.now()
    try {
      const content = activeType === 'text' ? inputText : file
      const report = await analyseContent(content, activeType)
      setResult(report)
      // Add to recent
      const newEntry = {
        id: `#AN-${analysisCount + 1}`,
        type: activeType,
        preview: activeType === 'text' ? inputText.slice(0, 60) : file?.name ?? '',
        score: report.risk_score,
        level: report.risk_level,
        action: report.recommended_action,
        date: formatDate(Date.now()),
      }
      setAnalyses(prev => [newEntry, ...prev].slice(0, 10))
      setAnalysisCount(c => c + 1)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => { setInputText(''); setResult(null); setError(null) }
  const TypeIcon = TYPES.find(t => t.id === activeType)?.icon ?? FileText

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* ── Left: Analyze + Results ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)' }}>Analyze Content</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--gray-500)', marginTop: 3 }}>Upload any content type and get AI-powered moderation results with detailed insights.</p>
        </div>

        {/* Type tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {TYPES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleTypeChange(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '8px 16px', borderRadius: 8,
                border: `1.5px solid ${activeType === id ? 'var(--blue-500)' : 'var(--gray-200)'}`,
                background: activeType === id ? 'var(--blue-50)' : 'var(--white)',
                color: activeType === id ? 'var(--blue-700)' : 'var(--gray-600)',
                fontFamily: 'inherit', fontSize: '0.85rem',
                fontWeight: activeType === id ? 600 : 400,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Main content area: input + result side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
          {/* Input card */}
          <div style={{ padding: 20, borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', background: 'var(--white)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gray-800)' }}>
                {activeType === 'text' ? 'Text Input' : `${TYPES.find(t => t.id === activeType)?.label} Input`}
              </h3>
              {activeType === 'text' && (
                <span style={{ fontSize: '0.72rem', color: 'var(--gray-400)', fontFamily: 'DM Mono' }}>
                  Characters: {inputText.length} / 10,000
                </span>
              )}
            </div>
            {activeType === 'text' ? (
              <div>
                <p style={{ fontSize: '0.78rem', color: 'var(--gray-500)', marginBottom: 10 }}>Enter or paste your text content to analyze.</p>
                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Type or paste content here..."
                  style={{
                    width: '100%', minHeight: 160, padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)', border: '1px solid var(--gray-200)',
                    fontFamily: 'DM Sans', fontSize: '0.85rem', color: 'var(--gray-700)',
                    resize: 'vertical', outline: 'none', lineHeight: 1.6,
                    background: 'var(--white)',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--blue-400)'}
                  onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                />
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '0.78rem', color: 'var(--gray-500)', marginBottom: 10 }}>
                  Upload your {activeType} file for analysis.
                </p>
                <UploadDropzone type={activeType} file={file} onFile={setFile} />
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button
                onClick={handleAnalyse}
                disabled={loading || !canAnalyse}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '9px 16px', borderRadius: 'var(--radius-sm)',
                  background: loading || !canAnalyse ? 'var(--gray-200)' : 'var(--blue-600)',
                  color: loading || !canAnalyse ? 'var(--gray-400)' : 'white',
                  border: 'none', cursor: loading || !canAnalyse ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600,
                  transition: 'all 0.15s',
                }}
              >
                {loading
                  ? <><Loader2 size={15} className="spin" /> Analyzing Content...</>
                  : <><Search size={15} /> Analyze {activeType.charAt(0).toUpperCase() + activeType.slice(1)}</>
                }
              </button>
              <button
                onClick={handleClear}
                style={{
                  padding: '9px 14px', borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--gray-200)', background: 'var(--white)',
                  color: 'var(--gray-600)', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: '0.85rem',
                }}
              >Clear</button>
            </div>

            {error && (
              <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--red-50)', border: '1px solid #fee2e2', color: '#dc2626', fontSize: '0.8rem', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>Analysis failed</div>
                  <div>{error}</div>
                  <div style={{ marginTop: 4, fontFamily: 'DM Mono', fontSize: '0.72rem', color: '#ef4444' }}>
                    Make sure backend is running: uvicorn main:app --reload
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Result card */}
          <div style={{ padding: 20, borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', background: 'var(--white)', boxShadow: 'var(--shadow-sm)', minHeight: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gray-800)' }}>Analysis Result</h3>
              {result && (
                <span style={{ fontSize: '0.7rem', color: 'var(--gray-400)', fontFamily: 'DM Mono' }}>
                  {result.model_used}
                </span>
              )}
            </div>

            {loading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, gap: 12, color: 'var(--gray-400)' }}>
                <Loader2 size={32} className="spin" color="var(--blue-500)" />
                <span style={{ fontSize: '0.82rem' }}>Analyzing content...</span>
              </div>
            )}

            {!loading && !result && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, gap: 10, color: 'var(--gray-400)', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TypeIcon size={22} color="var(--gray-300)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--gray-500)' }}>No analysis yet</div>
                  <div style={{ fontSize: '0.78rem', marginTop: 3 }}>Submit content to see moderation results</div>
                </div>
              </div>
            )}

            {!loading && result && <ResultPanel result={result} />}
          </div>
        </div>

        {/* Risk report + recent analyses — only shown after analysis */}
        {result && <RiskReport result={result} />}
        {analyses.length > 0 && <RecentTable analyses={analyses} />}
      </div>

      {/* ── Right: Sidebar info ── */}
      <div style={{
        width: 240, flexShrink: 0,
        borderLeft: '1px solid var(--gray-200)',
        padding: '24px 18px',
        background: 'var(--white)',
        overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        {/* How It Works */}
        <div>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--gray-800)', marginBottom: 14 }}>How It Works</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {HOW_IT_WORKS.map(({ n, icon: Icon, title, desc }) => (
              <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--blue-50)', border: '1px solid var(--blue-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={14} color="var(--blue-600)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-800)' }}>{n}. {title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: 2, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Formats */}
        <div>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--gray-800)', marginBottom: 12 }}>Supported Formats</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TYPES.map(({ id, label, icon: Icon, hint }) => (
              <div key={id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={13} color="var(--gray-600)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)' }}>{label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginTop: 1 }}>{hint}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        {result && (
          <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', background: 'var(--gray-50)', border: '1px solid var(--gray-200)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)', marginBottom: 10 }}>ANALYSIS STATS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                ['Content type', result.content_type],
                ['Processing time', `${result.processing_time_ms?.toFixed(0)}ms`],
                ['Model', result.model_used?.split('/')[1] ?? result.model_used],
                ['Categories', Object.keys(result.categories).length],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--gray-500)' }}>{label}</span>
                  <span style={{ color: 'var(--gray-700)', fontWeight: 500, textTransform: 'capitalize' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

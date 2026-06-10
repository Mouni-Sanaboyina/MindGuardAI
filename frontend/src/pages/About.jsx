import React from 'react'
import { Shield, Mic, ImageIcon, Video, FileText, Zap, Database, Clock } from 'lucide-react'

const FEATURES = [
  {
    icon: FileText,
    title: "Text Moderation",
    desc: "Uses Detoxify to detect toxicity, hate speech, harassment and profanity with category-wise risk scoring."
  },

  {
    icon: Mic,
    title: "Audio Moderation",
    desc: "Speech transcription using Whisper Large V3 followed by AI-powered toxicity analysis."
  },

  {
    icon: ImageIcon,
    title: "Image Moderation",
    desc: "Combines NudeNet, CLIP and GPT-4.1-mini to identify unsafe, adult and harmful visual content."
  }
]

const STACK = [
  { label: "Frontend", value: "React + Vite" },
  { label: "Backend", value: "FastAPI" },
  { label: "Text AI", value: "Detoxify" },
  { label: "Speech AI", value: "Whisper Large V3" },
  { label: "Vision AI", value: "NudeNet + CLIP" },
  { label: "LLM", value: "GPT-4.1-mini" }
]

export default function About() {
  return (
    <div style={{ padding: '24px', maxWidth: 800 }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>About MindGuardAI</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: 28 }}>
        An AI-powered content moderation platform built to detect harmful content across all media types in a single unified pipeline.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} style={{ padding: 18, borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', background: 'var(--white)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--blue-50)', border: '1px solid var(--blue-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Icon size={18} color="var(--blue-600)" />
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>{title}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: 20, borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', background: 'var(--white)' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gray-800)', marginBottom: 14 }}>Tech Stack</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {STACK.map(({ label, value }) => (
            <div key={label} style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--gray-50)', border: '1px solid var(--gray-100)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', fontWeight: 500, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--gray-700)', fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function apiFetch(url, opts = {}) {
  const res = await fetch(url, opts)
  if (!res.ok) {
    let detail = `HTTP ${res.status}`
    try { const e = await res.json(); detail = e.detail ?? detail } catch (_) {}
    throw new Error(detail)
  }
  return res.json()
}

export async function analyseText(text) {
  return apiFetch(`${BASE}/analyse/text/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
}

export async function analyseAudio(file) {
  const fd = new FormData(); fd.append('file', file)
  return apiFetch(`${BASE}/analyse/audio/`, { method: 'POST', body: fd })
}

export async function analyseImage(file) {
  const fd = new FormData(); fd.append('file', file)
  return apiFetch(`${BASE}/analyse/image/`, { method: 'POST', body: fd })
}

export async function analyseVideo(file) {
  const fd = new FormData(); fd.append('file', file)
  return apiFetch(`${BASE}/analyse/video/`, { method: 'POST', body: fd })
}

export async function analyseContent(content, type) {
  const map = { text: analyseText, audio: analyseAudio, image: analyseImage, video: analyseVideo }
  return map[type](content)
}

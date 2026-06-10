/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        cyber: {
          50:  '#eef9ff',
          100: '#d8f0ff',
          200: '#b9e5ff',
          300: '#89d6ff',
          400: '#52befd',
          500: '#2a9df4',
          600: '#1480e8',
          700: '#0d67d4',
          800: '#1253ab',
          900: '#144787',
        },
        neon: {
          blue:    '#00d4ff',
          purple:  '#b44fff',
          pink:    '#ff2d9b',
          green:   '#00ffb3',
          yellow:  '#f9ff00',
        },
        void: {
          900: '#03040a',
          800: '#070910',
          700: '#0c0e1a',
          600: '#111425',
          500: '#161930',
          400: '#1d2240',
        },
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'pulse-glow':    'pulseGlow 2s ease-in-out infinite',
        'scan-line':     'scanLine 3s linear infinite',
        'fade-in-up':    'fadeInUp 0.8s ease forwards',
        'counter':       'counter 2s ease-out forwards',
        'shimmer':       'shimmer 2s linear infinite',
        'orbit':         'orbit 8s linear infinite',
        'data-stream':   'dataStream 4s linear infinite',
        'grid-flow':     'gridFlow 20s linear infinite',
        'type-cursor':   'typeCursor 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,255,0.3)' },
          '50%':      { boxShadow: '0 0 50px rgba(0,212,255,0.8), 0 0 100px rgba(0,212,255,0.3)' },
        },
        scanLine: {
          '0%':   { top: '-2px' },
          '100%': { top: '100%' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        dataStream: {
          '0%':   { transform: 'translateY(-100%)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        gridFlow: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
        typeCursor: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)",
        'glow-radial': 'radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg:    '#020617',
        bg2:   '#0a1128',
        bg3:   '#0f172a',
        neon:  '#00d4ff',
        neon2: '#7c3aed',
        neon3: '#10b981',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow':  'spin 25s linear infinite',
        'fade-in':    'fadeIn .6s ease forwards',
      },
      keyframes: {
        float:     { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-14px)' } },
        pulseGlow: { '0%,100%': { opacity:.5 }, '50%': { opacity:1 } },
        fadeIn:    { from: { opacity:0, transform:'translateY(20px)' }, to: { opacity:1, transform:'translateY(0)' } },
      },
    }
  },
  plugins: []
}

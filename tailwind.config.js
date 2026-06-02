/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        forest: { 500: '#00A651', 400: '#00D4AA', 300: '#4ADE80' },
        gold: { 500: '#F5A623', 400: '#FFD166', 300: '#FCD68A' },
        ocean: { 500: '#3B82F6', 400: '#818CF8', 300: '#93C5FD' },
        ember: { 500: '#EF4444', 400: '#FCA5A5' },
        ink: { 900: '#04080F', 800: '#0A1628', 700: '#0F1F3A', 600: '#162847' },
      },
      animation: {
        'orb-drift': 'orbDrift 20s ease-in-out infinite',
        'orb-drift-r': 'orbDriftR 25s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite 2s',
        'grain': 'grain 0.5s steps(1) infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'number-count': 'numberCount 1.5s ease-out forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'counter-ring': 'counterRing 1.5s ease-out forwards',
      },
      keyframes: {
        orbDrift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(3vw,5vh) scale(1.08)' },
          '66%': { transform: 'translate(-2vw,3vh) scale(0.96)' },
        },
        orbDriftR: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '40%': { transform: 'translate(-4vw,-4vh) scale(1.06)' },
          '70%': { transform: 'translate(2vw,3vh) scale(0.97)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff0055',
          blue: '#00f2ff',
          gold: '#ffd700',
          silver: '#c0c0c0',
        },
        bg: {
          dark: '#03050a',
          darker: '#0a0c15',
          card: '#0d1117',
        },
      },
      fontFamily: {
        cyber: ['Orbitron', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-pink': 'pulse-pink 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        'pulse-pink': {
          '0%, 100%': { boxShadow: '0 0 5px #ff0055, 0 0 20px #ff0055' },
          '50%': { boxShadow: '0 0 20px #ff0055, 0 0 60px #ff0055' },
        },
        glow: {
          from: { textShadow: '0 0 5px #00f2ff, 0 0 10px #00f2ff' },
          to: { textShadow: '0 0 20px #00f2ff, 0 0 40px #00f2ff, 0 0 80px #00f2ff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(0,242,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary':    'var(--bg-primary)',
        'bg-surface':    'var(--bg-surface)',
        'bg-elevated':   'var(--bg-elevated)',
        'accent-1':      'var(--accent-1)',
        'accent-2':      'var(--accent-2)',
        'accent-glow':   'var(--accent-glow)',
        'text-primary':  'var(--text-primary)',
        'text-secondary':'var(--text-secondary)',
        'text-muted':    'var(--text-muted)',
      },
      fontFamily: {
        space: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
        mono:  ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'ticker-left':   'tickerLeft 35s linear infinite',
        'ticker-right':  'tickerRight 35s linear infinite',
        'pulse-ring':    'pulseRing 2.5s ease-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'blink':         'blink 1s step-end infinite',
        'wave':          'wave 2s ease-in-out infinite',
      },
      keyframes: {
        tickerLeft:  { '0%': {transform:'translateX(0)'},  '100%': {transform:'translateX(-50%)'} },
        tickerRight: { '0%': {transform:'translateX(-50%)'},'100%': {transform:'translateX(0)'}  },
        pulseRing:   { '0%': {transform:'scale(1)',opacity:'0.6'}, '100%': {transform:'scale(2)',opacity:'0'} },
        float:       { '0%,100%': {transform:'translateY(0)'}, '50%': {transform:'translateY(-20px)'} },
        blink:       { '0%,100%': {opacity:'1'}, '50%': {opacity:'0'} },
        wave:        { '0%,100%': {transform:'rotate(0deg)'}, '20%': {transform:'rotate(-10deg)'}, '60%': {transform:'rotate(10deg)'} },
      },
    },
  },
  plugins: [],
};

export default config;

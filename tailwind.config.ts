import type { Config } from 'tailwindcss';

/**
 * Warm, friendly, deliberately NON-PARTISAN palette shared in spirit with the
 * sibling site (RankYourPolitician) so the two feel related. Good/bad is NEVER
 * carried by colour alone (green/saffron/red are communally-coded in India) -
 * it is carried by an up/down icon + a factual label. Colours here are theme
 * tokens, not verdicts.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          soft: 'rgb(var(--color-ink-soft) / <alpha-value>)',
          faint: 'rgb(var(--color-ink-faint) / <alpha-value>)',
        },
        paper: {
          DEFAULT: 'rgb(var(--color-paper) / <alpha-value>)',
          soft: 'rgb(var(--color-paper-soft) / <alpha-value>)',
          sink: 'rgb(var(--color-paper-sink) / <alpha-value>)',
        },
        line: 'rgb(var(--color-line) / <alpha-value>)',
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
          ink: 'rgb(var(--color-brand-ink) / <alpha-value>)',
          soft: 'rgb(var(--color-brand-soft) / <alpha-value>)',
          deep: 'rgb(var(--color-brand-deep) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          ink: 'rgb(var(--color-accent-ink) / <alpha-value>)',
          soft: 'rgb(var(--color-accent-soft) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['1.0625rem', { lineHeight: '1.6' }],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(28,32,42,0.04), 0 8px 24px rgba(28,32,42,0.06)',
        lift: '0 2px 4px rgba(28,32,42,0.05), 0 16px 40px rgba(28,32,42,0.10)',
        glass: '0 1px 1px rgba(255,255,255,0.6) inset, 0 1px 2px rgba(28,32,42,0.04), 0 12px 32px rgba(49,46,129,0.08)',
      },
      maxWidth: { content: '72rem' },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'aurora-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(2%, -3%) scale(1.05)' },
          '66%': { transform: 'translate(-2%, 2%) scale(0.98)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.55s cubic-bezier(0.32,0.72,0,1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'aurora-drift': 'aurora-drift 24s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

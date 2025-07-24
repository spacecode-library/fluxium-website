import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'space-void': 'rgb(var(--space-void) / <alpha-value>)',
        'space-deep': 'rgb(var(--space-deep) / <alpha-value>)',
        'space-dark': 'rgb(var(--space-dark) / <alpha-value>)',
        'space-medium': 'rgb(var(--space-medium) / <alpha-value>)',
        'cosmic-purple': 'rgb(var(--cosmic-purple) / <alpha-value>)',
        'cosmic-blue': 'rgb(var(--cosmic-blue) / <alpha-value>)',
        'cosmic-cyan': 'rgb(var(--cosmic-cyan) / <alpha-value>)',
        'nebula-pink': 'rgb(var(--nebula-pink) / <alpha-value>)',
        'stellar-gold': 'rgb(var(--stellar-gold) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
        'text-dim': 'rgb(var(--text-dim) / <alpha-value>)',
      },
      fontFamily: {
        'primary': 'var(--font-primary)',
        'display': 'var(--font-display)',
      },
      fontSize: {
        'fluid-xs': 'var(--text-xs)',
        'fluid-sm': 'var(--text-sm)',
        'fluid-base': 'var(--text-base)',
        'fluid-lg': 'var(--text-lg)',
        'fluid-xl': 'var(--text-xl)',
        'fluid-2xl': 'var(--text-2xl)',
        'fluid-3xl': 'var(--text-3xl)',
        'fluid-4xl': 'var(--text-4xl)',
        'fluid-5xl': 'var(--text-5xl)',
        'fluid-6xl': 'var(--text-6xl)',
      },
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'base': 'var(--transition-base)',
        'slow': 'var(--transition-slow)',
      },
      zIndex: {
        'negative': 'var(--z-negative)',
        '0': 'var(--z-0)',
        '10': 'var(--z-10)',
        '20': 'var(--z-20)',
        '30': 'var(--z-30)',
        '40': 'var(--z-40)',
        '50': 'var(--z-50)',
        '60': 'var(--z-60)',
        '70': 'var(--z-70)',
        '80': 'var(--z-80)',
        '90': 'var(--z-90)',
        '100': 'var(--z-100)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-cosmic': 'linear-gradient(135deg, rgb(var(--cosmic-purple)), rgb(var(--cosmic-cyan)))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'twinkle': 'twinkle 3s infinite',
        'fire-flicker': 'fire-flicker 0.2s infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'fire-flicker': {
          '0%': { transform: 'translateX(-50%) scaleY(1)', opacity: '0.9' },
          '100%': { transform: 'translateX(-50%) scaleY(1.2)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#0066CC', // blue-600
        'primary-50': '#EBF4FF', // blue-50
        'primary-100': '#DBEAFE', // blue-100
        'primary-200': '#BFDBFE', // blue-200
        'primary-300': '#93C5FD', // blue-300
        'primary-400': '#60A5FA', // blue-400
        'primary-500': '#3B82F6', // blue-500
        'primary-600': '#0066CC', // blue-600
        'primary-700': '#1D4ED8', // blue-700
        'primary-800': '#1E40AF', // blue-800
        'primary-900': '#1E3A8A', // blue-900
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#1A1A2E', // slate-900
        'secondary-50': '#F8FAFC', // slate-50
        'secondary-100': '#F1F5F9', // slate-100
        'secondary-200': '#E2E8F0', // slate-200
        'secondary-300': '#CBD5E1', // slate-300
        'secondary-400': '#94A3B8', // slate-400
        'secondary-500': '#64748B', // slate-500
        'secondary-600': '#475569', // slate-600
        'secondary-700': '#334155', // slate-700
        'secondary-800': '#1E293B', // slate-800
        'secondary-900': '#1A1A2E', // slate-900
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#00FF88', // green-400
        'accent-50': '#F0FDF4', // green-50
        'accent-100': '#DCFCE7', // green-100
        'accent-200': '#BBF7D0', // green-200
        'accent-300': '#86EFAC', // green-300
        'accent-400': '#00FF88', // green-400
        'accent-500': '#22C55E', // green-500
        'accent-600': '#16A34A', // green-600
        'accent-700': '#15803D', // green-700
        'accent-800': '#166534', // green-800
        'accent-900': '#14532D', // green-900
        'accent-foreground': '#000000', // black

        // Background Colors
        'background': '#FAFBFC', // gray-50
        'surface': '#F1F3F5', // gray-100
        'surface-hover': '#E9ECEF', // gray-200

        // Text Colors
        'text-primary': '#212529', // gray-900
        'text-secondary': '#6C757D', // gray-600
        'text-muted': '#ADB5BD', // gray-500

        // Status Colors
        'success': '#28A745', // green-600
        'success-50': '#F0FDF4', // green-50
        'success-100': '#DCFCE7', // green-100
        'success-foreground': '#FFFFFF', // white

        'warning': '#FFC107', // yellow-400
        'warning-50': '#FFFBEB', // yellow-50
        'warning-100': '#FEF3C7', // yellow-100
        'warning-foreground': '#000000', // black

        'error': '#DC3545', // red-600
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-foreground': '#FFFFFF', // white

        // Conversion Colors
        'conversion': '#FF6B35', // orange-500
        'conversion-50': '#FFF7ED', // orange-50
        'conversion-100': '#FFEDD5', // orange-100
        'conversion-foreground': '#FFFFFF', // white

        // Border Colors
        'border': '#E9ECEF', // gray-300
        'border-hover': '#DEE2E6', // gray-400
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        'headline': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'code': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }], // 10px
        'xs': ['0.75rem', { lineHeight: '1rem' }], // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }], // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        '5xl': ['3rem', { lineHeight: '1' }], // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }], // 72px
        '8xl': ['6rem', { lineHeight: '1' }], // 96px
        '9xl': ['8rem', { lineHeight: '1' }], // 128px
      },
      spacing: {
        '13': '3.25rem', // 52px - Golden ratio scaling
        '21': '5.25rem', // 84px - Golden ratio scaling
        '34': '8.5rem', // 136px - Golden ratio scaling
        '55': '13.75rem', // 220px - Golden ratio scaling
        '89': '22.25rem', // 356px - Golden ratio scaling
      },
      borderRadius: {
        'xs': '0.125rem', // 2px
        'sm': '0.25rem', // 4px
        'DEFAULT': '0.25rem', // 4px
        'md': '0.375rem', // 6px
        'lg': '0.5rem', // 8px
        'xl': '0.75rem', // 12px
        '2xl': '1rem', // 16px
        '3xl': '1.5rem', // 24px
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'brand': '0 2px 4px rgba(26, 26, 46, 0.1), 0 8px 16px rgba(26, 26, 46, 0.1)',
        'oscilloscope': '0 0 10px rgba(0, 255, 136, 0.3), 0 0 20px rgba(0, 255, 136, 0.2)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 136, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 255, 136, 0.4)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'responsive': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
}
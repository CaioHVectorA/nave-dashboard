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
        'dark-blue': 'var(--dark-blue)',
        'sample-blue': 'var(--sample-blue)',
        'gray-blue': 'var(--gray-blue)',
        'action-blue': 'var(--action-blue)',
        'bg': 'var(--bg)',
        'sub-bg': 'var(--sub-bg)',
        'main-text': 'var(--text)'
      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate')
  ],
}
export default config

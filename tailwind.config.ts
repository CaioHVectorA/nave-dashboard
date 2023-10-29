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
      },
    },
  },
  plugins: [],
}
export default config

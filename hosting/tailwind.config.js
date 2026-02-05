/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: '#39b6ff',
          navy: '#1b5373',
          gold: '#f7c74a',
          green: '#23b666',
          gray: '#F9FAFB',
          cream: '#F8F5F0',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            thead: {
              borderBottomWidth: '2px',
              borderBottomColor: '#39b6ff',
            },
            'thead th': {
              padding: '0.75em 1em',
              textAlign: 'left',
              fontWeight: '700',
              color: '#1b5373',
              backgroundColor: '#F3F4F6',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: '#E5E7EB',
            },
            'tbody tr:last-child': {
              borderBottomWidth: '0',
            },
            'tbody td': {
              padding: '0.75em 1em',
              verticalAlign: 'top',
            },
            'tbody tr:nth-child(even)': {
              backgroundColor: '#F9FAFB',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
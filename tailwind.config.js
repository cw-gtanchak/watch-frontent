// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: '#F9F9F9',
        lightGray: '#F1F2F6',
        offWhiteGray: '#F8F8F8',
        silver: '#E0E1E2',
        neutral: {
          400: '#AAAAAA',
          500: '#666666',
        },
        blue: {
          500: '#524FEF',
        },
        icon: {
          purple: '#6C69FF',
          amber: '#FFAD0F',
          red: '#DD0050',
          mint: '#68C9B9',
          pink: '#FF8ED2',
          orange: '#F45D5D',
          yellow: '#FBC708',
        },
      },
      backgroundColor: {
        yaml: '#524FEF15',
      },
      fontSize: {
        xxs: '0.66rem',
      },
      width: {
        18: '4.5rem',
      },
      transitionProperty: {
        'menu-button': 'background, top, transform',
      },
      boxShadow: {
        '3xl':
          '0px 8px 10px 0px rgba(0, 0, 0, 0.50), 0px -2px 52px 0px rgba(200, 200, 200, 0.06) inset',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
  safelist: [
    'bottom-4',
    'flex',
    'items-center',
    'justify-center',
    'h-6',
    'max-h-full',
    'uppercase',
    'font-medium',
    'bg-neutral-100',
    'text-neutral-500',
    'px-2',
    'text-xxs',
  ],
  variants: {
    fill: ['hover'],
  },
  darkMode: 'class',
};

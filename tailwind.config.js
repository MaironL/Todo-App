module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        desktopDarkTheme: 'url(infrastructure/assets/images/bg-desktop-dark.jpg)',
        desktopLightTheme: 'url(infrastructure/assets/images/bg-desktop-light.jpg)',
        mobileDarkTheme: 'url(infrastructure/assets/images/bg-mobile-dark.jpg)',
        mobileLightTheme: 'url(infrastructure/assets/images/bg-mobile-light.jpg)',
      },
    },
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1440px',
      '2xl': '1800px',
    },
  },
  plugins: [],
};

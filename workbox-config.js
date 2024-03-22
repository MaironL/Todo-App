module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{json,ico,html,txt,png,css,js,jpg,svg}'],
  swDest: 'build/sw.js',
  swSrc: 'src/sw-template.js', //generateSW dont work with this property
  // ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};

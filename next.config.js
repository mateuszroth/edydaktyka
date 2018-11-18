const withSass = require('@zeit/next-sass')

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]__[hash:base64:5]",
  },
  webpack: (config, { dev }) => {
    // Unshift polyfills in main entrypoint.
    // https://github.com/zeit/next.js/issues/2060
    if (dev) {
      return config
    }

    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()
      if (entries['main.js']) {
        entries['main.js'].unshift('./polyfills.js')
      }
      return entries
    }
    return config
  }
})
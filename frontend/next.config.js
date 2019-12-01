const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');

module.exports = withLess(
    withSass({
        lessLoaderOptions: {
            javascriptEnabled: true,
        },
        cssModules: true,
        cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: '[local]__[hash:base64:5]',
        },
        env: {
            GRAPHQL_URL: 'http://localhost:4000', // TODO: set for production
            SERVER_URL: 'http://localhost:4000', // TODO: set for production
        },
        webpack: (config, { dev }) => {
            // Unshift polyfills in main entrypoint.
            // https://github.com/zeit/next.js/issues/2060
            if (dev) {
                return config;
            }

            const originalEntry = config.entry;
            config.entry = async () => {
                const entries = await originalEntry();
                if (entries['main.js']) {
                    entries['main.js'].unshift('./polyfills.js');
                }
                return entries;
            };
            return config;
        },
    }),
);

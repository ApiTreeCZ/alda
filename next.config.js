require('dotenv').config();
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript({
    webpack(config, options) {
        if (options.isServer && process.env.NODE_ENV !== 'production') {
            config.plugins.push(new ForkTsCheckerWebpackPlugin());
        }
        return config;
    },
});

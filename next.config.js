require('dotenv').config();
const withTypescript = require('@zeit/next-typescript');
const webpack = require('webpack');

module.exports = withTypescript({
    webpack(config) {
        config.plugins = [
            ...config.plugins || [],
            new webpack.DefinePlugin({
                'process.env.BACKEND_ENDPOINT': JSON.stringify(process.env.BACKEND_ENDPOINT),
            }),
        ];
        return config;
    },
});

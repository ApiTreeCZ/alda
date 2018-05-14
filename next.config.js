require('dotenv').config();
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
    webpack(config) {
        return config;
    },
});

/** @type {import('next').NextConfig} */

const webpack = require("webpack");

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }));

        return config;
    },
    env: {
        BASE_URL: '//172.232.189.142:8000',
    },
};

module.exports = nextConfig


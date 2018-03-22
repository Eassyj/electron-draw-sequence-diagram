const path = require('path');
const webpack = require('webpack');
const plugins = require('./webpack.plugin');
const nodeExternals = require('webpack-node-externals');

const PATHS = {
    prod: path.resolve(__dirname, 'app'),
}

// PRODUCTION CONFIGS

// DEV CONFIGS
const developmentConfig = merge([

    //Analyze Bundle
    plugins.analyzeBundle(),

    // Dev Server
    plugins.devServer({
        host: 'localhost',
        port: 3000,
    }),
    // Output
    {
        output: {
            publicPath: 'http://localhost:3000/',
            filename: '[name].dev.js',
        },
        // Other Plugins
        plugins: [
            // prints more readable module names in the browser console on HMR updates
            new webpack.NamedModulesPlugin(),
            // Ignore stuff
            new webpack.IgnorePlugin(/vertx/),
        ],
        // Ignore all modules in node_modules folder
        externals: [
            nodeExternals({
                // Except Webpack Hot Devserver & Emitter so
                // react-hot-loader can work properly
                whitelist: ['webpack/hot/dev-server', 'webpack/hot/emitter'],
            }),
        ],
    },
]);

// SHARED CONFIGSz
const commonConfig = merge([
    // Check Duplicates
    plugins.checkDuplicate({
        verbose: true,
        emitError: true,
    }),
    // Separate source map from bundles
    parts.generateSourceMaps({ type: 'none' }),
    // Extract Bundle & Code Spliting
    parts.extractBundles([{
        name: 'vendor',
        minChunks: ({ resource }) =>
            resource &&
            resource.indexOf('node_modules') >= 0 &&
            resource.match(/\.js$/),
    }, ]),

    {
        target: 'electron-renderer',
        // Set Performance Budget
        performance: {
            // Show performance warning. Can use 'error' as well
            hints: 'warning',
            maxEntrypointSize: 100000, // in bytes
            maxAssetSize: 450000, // in bytes
        },

        entry: {
            main: ['./app/index.jsx'],
        },

        context: path.resolve(__dirname),

        resolve: {
            extensions: ['.js', '.jsx'],
        },

        module: {
            rules: [{
                test: /\.jsx$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            }, ],
        },

        node: {
            __dirname: false,
            __filename: false,
        },
    },
]);
const webpack = require('webpack'),
      path = require('path'),
      autoprefixer = require('autoprefixer');


const config = require('./config');

module.exports = {
    devtool: 'eval',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${config.host}:${config.clientPort}`,
        'webpack/hot/only-dev-server',
        './client/index.js'
    ],
    output: {
        publicPath: '/static/',
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_module/,
                loaders: [
                    {
                        loader: 'babel-loader',
                        query: {
                            babelrc: false,
                            presets: ["es2015", "stage-0", "react"]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_module/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {test: /\.png$/, loader: "url-loader?prefix=img/&limit=5000"},
            {test: /\.jpg$/, loader: "url-loader?prefix=img/&limit=5000"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: `${config.clientPort}`,
        hot: true,
        inline: false,
        historyApiFallback: true
    }
};
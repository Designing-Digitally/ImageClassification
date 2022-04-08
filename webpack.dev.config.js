const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/sketch.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
        clean: true
    },
    mode: 'development',
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        devMiddleware:{
            index: 'index.html',
            writeToDisk: true
        }
    },
    module: {
        rules:[
            {
                test: /\.(png|jpg)$/, //regex to look for png or jpg
                type: 'asset',
                parser: {
                    dataUrlCondition:{
                        maxSize: 3 * 1024 // 3 kilobytes
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ImageClassification - ML5js'
        })
    ]
}
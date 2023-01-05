const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: path.resolve('src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        })
    ]
};
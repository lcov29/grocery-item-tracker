const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = {
   mode: 'development',
   devtool: 'eval-source-map',
   entry: path.resolve('src', 'index.tsx'),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: { loader: 'babel-loader' },
         },
         {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: { loader: 'ts-loader' },
         },
         {
            test: /\.css$/i,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|jpeg|svg)$/,
            loader: 'file-loader',
         }
      ],
   },
   resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.join(__dirname, 'src', 'index.html'),
         filename: 'index.html',
      }),
   ],
};

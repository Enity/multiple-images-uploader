const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   devServer: {
      contentBase: './dist',
      hot: true
   },
   mode: 'development',
   devtool: 'inline-source-map',
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader"
            }
         },
         {
            test: /\.html$/,
            use: [
               {
                  loader: "html-loader",
               }
            ]
         },
         {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        }
      ]
   },
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        minify: {
         removeComments: true,
         collapseWhitespace: true,
         removeAttributeQuotes: true
         // more options:
         // https://github.com/kangax/html-minifier#options-quick-reference
       }
      }),
      new ExtractTextPlugin({
        filename: "style.css"
      })
    ]
};
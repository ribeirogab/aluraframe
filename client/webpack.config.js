const path = require('path')
const BabiliPlugin = require('babili-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')
const { ProvidePlugin, optimize, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = []

plugins.push(new HtmlWebpackPlugin({
  hash: true,
  minify: {
    html5: true,
    collapseWhitespace: true,
    removeComments: true
  },
  filename: 'index.html',
  template: __dirname + '/main.html'
}))

// Plugin para criação de arquivo css único
plugins.push(new ExtractTextPlugin('styles.css'))

// Importando módulos globais. [ jquery ]
plugins.push(new ProvidePlugin({
  '$': 'jquery/dist/jquery.js',
  'jQuery': 'jquery/dist/jquery.js'
}))

// Plugin utilizado para separação do código das bibliotecas em outro bundle.
plugins.push(new optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: 'vendor.bundle.js'
}))

let SERVICE_URL = JSON.stringify('http://localhost:3000')
// Verificando variável de ambiemte, para assim diferenciar o build de desenvolvimento do de produção
if (process.env.NODE_ENV == 'production') {
  SERVICE_URL = JSON.stringify('https://apitouse.herokuapp.com/trades/')
  plugins.push(new optimize.ModuleConcatenationPlugin())
  plugins.push(new BabiliPlugin())
  plugins.push(new OptimizeCssAssetsPlugin({
    cssProcessor: cssnano,
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true
  }))
}

plugins.push(new DefinePlugin({
  SERVICE_URL
}))

// Exportando configurações do webpack
module.exports = {
  entry: {
    app: './app/src/index.js',
    vendor: ['jquery', 'bootstrap', 'reflect-metadata'] // Módulos que ficarão no arquivo "vendor.bundle.js"
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader'
        })
      }, {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins
}
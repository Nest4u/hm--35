const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Очищення папки dist перед збіркою
  },
  devtool: 'source-map', // Додає мапи для зручності відладки
  devServer: {
    static: './dist',
    open: true,
    hot: true,
    port: 8080,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      // TypeScript
      {
        test: /\.ts$/, // Вказуємо, що файл з розширенням .ts повинен бути оброблений
        exclude: /node_modules/, // Виключаємо директорію node_modules з обробки
        use: {
          loader: 'babel-loader', // Використовуємо babel-loader для компіляції
          options: {
            presets: [
              '@babel/preset-env', // Перетворення ES6+ у сумісний код JavaScript
              '@babel/preset-typescript' // Додавання підтримки TypeScript
            ]
            }
        }
      },
      // Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // SCSS
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // LESS
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      // CSS
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true, 
    }),
    new ESLintPlugin({
        extensions: ['js', 'ts'], 
        fix: true,               
      }),
  ],
};

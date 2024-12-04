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
    clean: true, 
  },
  devtool: 'source-map',
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
        test: /\.ts$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader', 
          options: {
            presets: [
              '@babel/preset-env', 
              '@babel/preset-typescript' 
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

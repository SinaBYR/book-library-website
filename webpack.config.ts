import * as webpack from 'webpack';
import * as path from 'path';
const { NODE_ENV = 'production' } = process.env;
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

type mode = "production" | "none" | "development" | undefined

const config: webpack.Configuration = {
  entry: {
    server: './src/server.ts',
    // home: {
    //   import: './src/views/home/home.ts',
    //   filename: 'public/js/home.min.js'
    // }
  },
  mode: NODE_ENV as mode,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        resolve: {
          extensions: ['.ts', '.js']
        }
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ]
  },
  externals: [nodeExternals()],
  watch: NODE_ENV === 'development',
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['npm run dev:watch'],
        blocking: false,
        parallel: true
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: 'public/css/main.min.css',
    }),
  ]
}

export default config;
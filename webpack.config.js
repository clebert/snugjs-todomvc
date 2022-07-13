import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin';

/** @type {import('webpack').Configuration} */
export default {
  target: `web`,
  entry: {index: `./src/index.tsx`},
  output: {
    filename: `[name].[contenthash].js`,
    path: join(dirname(fileURLToPath(import.meta.url)), `dist`),
    publicPath: `/`,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `[name].html`,
      template: `./src/index.html`,
    }),
    new MiniCssExtractPlugin({filename: `[name].[contenthash].css`}),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {loader: `swc-loader`},
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {loader: `css-loader`}],
      },
    ],
  },
  resolve: {extensions: [`.ts`], plugins: [new ResolveTypeScriptPlugin()]},
  devtool: `source-map`,
  optimization: {minimize: true},
};

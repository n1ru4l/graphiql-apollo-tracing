/* eslint-env node */

import path from 'path'
import webpack from 'webpack'

export default {
  entry: path.join(__dirname, `example/index.js`),
  output: {
    path: `/graphiql`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: `babel-loader`,
        },
      },
    ],
  },
  watch: true,
  plugins: [
    new webpack.ContextReplacementPlugin(
      /graphql-language-service-interface[/\\]dist/,
      new RegExp(`^\\./.*\\.js$`),
    ),
  ],
}

module.exports = {
  index: './src/js/index.js',
  register: './src/js/register.js',
  output: {
    path: __dirname + 'public',
    filename: 'index.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ["@babel/preset-env", {
              useBuiltIns: "usage",
              corejs: 3
            }]
          ],
          plugins: ['@babel/plugin-proposal-class-properties']
        }

      }
    }]
  }
};
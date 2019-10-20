const path = require('path');

module.exports = {
  entry: {
index:'./src/js/index-blog.js',
mostrar: './src/js/mostrarPost.js',
  },
  output: {
    filename: 'index-blog.js',
    path: path.resolve(__dirname, 'public'),
  },
};
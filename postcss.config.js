module.exports = {
  plugins: [
    require('autoprefixer')(
      {
        browsers: [
          'ie >= 11',
          'last 2 ff versions',
          'last 2 Chrome versions',
          'last 2 Safari versions',
          'iOS >= 8',
          'Android >= 4.0'
        ]
      }
    ),
    require('postcss-flexbugs-fixes'),
    require('css-mqpacker')({ sort: function (a, b) { return b.localeCompare(a) } })
  ]
}

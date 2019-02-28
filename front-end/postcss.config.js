module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*']
    },
   'autoprefixer': {
     browsers: ['Android >= 4.0', 'iOS >= 7']
   }
 }
}

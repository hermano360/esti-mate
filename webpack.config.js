var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry:[
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'
  ],
  externals:{
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename:'./public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias:{
      Contact: 'app/components/Contact.jsx',
      Intro: 'app/components/Intro.jsx',
      Main: 'app/components/Main.jsx',
      Nav: 'app/components/Nav.jsx',
      NewEstimate:'app/components/NewEstimate.jsx',
      applicationStyles:'app/styles/app.scss',
      ProductAccess: 'app/api/ProductAccess.js'
    },
    extensions: ['','.js','.jsx']
  },
  module:{
    loaders: [
      {
        loader:'babel-loader',
        query:{
          presets: ['react', 'es2015','stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_compenents)/
      }
    ]
  },
  sassLoader:{
    includePaths:[
      path.resolve(__dirname,'./node_modules/foundation-sites/scss')
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};

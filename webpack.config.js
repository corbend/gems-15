var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'./src/main',
		'webpack-dev-server/client?http://localhost:8080'
	],
	output: {
		publicPath: '/',
		filename: 'bundle.js'
	},
	debug: true,
  	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [
			        path.resolve(__dirname, "src"),
			    ],
				// query: {
				// 	presets: ['es2015']
				// }
			},
			{
        		test: /\.less$/,
        		loader: "style!css!autoprefixer!less"
      		},
		]
	},
	devServer: {
    	contentBase: "./src"
  	}
	//plugins: [
	//	webpack.noErrorPlugin,
	//	webpack.hotPluginReload
	//]
}
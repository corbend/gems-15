{
	entry: 'src'
	output: 'build',
	module: {
		loaders: [
			{
				test: '.js',
				loader: 'babel'
			}
		]
	},
	plugins: [
		webpack.noErrorPlugin,
		webpack.hotPluginReload
	]
}
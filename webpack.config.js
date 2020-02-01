const path = require('path');

module.exports = {
	entry: './server/src/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx|ejs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
						plugins: [ '@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties' ]
					}
				}
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		publicPath: '/public/',
		filename: 'bundle.js'
	}
};

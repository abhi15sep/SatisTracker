module.exports = {
	presets: [
		[ '@babel/preset-env', { targets: { browsers: [ 'last 1 version', 'ie >= 11' ] } }, '@babel/preset-react' ]
	],
	plugins: [ '@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties' ]
};

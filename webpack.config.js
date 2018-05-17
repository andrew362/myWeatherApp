
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



const config = {
	'mode': 'none',
	'entry': './src/scripts/index.js',
	'output': {
		'path': Path.resolve(__dirname, 'dist'),
		'filename': 'bundle.js'
	},
	"module": {
		"rules": [
			{
				"use": "babel-loader",
				"test": /\.js$/
				
			}
		]
	},
	// "plugins": [
	// 	new HtmlWebpackPlugin({
	// 		"template": './src/index-template.html',
	// 		"filename": "index.html"
	// 	})
	// ]
	
	
};

module.exports = config;
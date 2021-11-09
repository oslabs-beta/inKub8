module.exports = [
	//Add support for native node modules
	{
		//We're specifying native_modules in the test because the asset relocator loader generates a
		//"fake" .node file which is really a cjs file.
		test: /native_modules\/.+\.node$/,
		use: "node-loader",
	},
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
		},
	},
	/*{
		test: /\.(png|jpg)$/,
		exclude: /node_modules/,
		use: {
			loader: "file-loader"
		},
		options: {
			name: "/public/icons/[name].[ext]"
		}
	}*/
	//Put your webpack loader rules in this array.  This is where you would put
	//your ts-loader configuration for instance:
	/**
   * Typescript Example:
   *
   * {
   *   test: /\.tsx?$/,
   *   exclude: /(node_modules|.webpack)/,
   *   loaders: [{
   *     loader: 'ts-loader',
   *     options: {
   *       transpileOnly: true
   *     }
   *   }]
   * }
   */
];


const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const Webpack = require("webpack");

module.exports = (env) => {
	const APPLICATION_ROOT_PATH = `/${env && env.APPLICATION_ROOT_PATH || "/"}`;

	return {
		/**
		 * Defines which module webpack should use to start building dependency graph.
		 */
		entry: [
			// "url-search-params-polyfill",
			"./src/index.tsx",
		],
		/**
		 * Defines which mode Webpack is on.
		 */
		mode: "production",
		/**
		 * Defines how webpack will process each type of file.
		 */
		module: {
			/**
			 * Provides a list of rules for each type of file.
			 */
			rules: [
				{
					exclude: /node_modules/,
					test: /\.(js|jsx|ts|tsx)?$/,
					use: {
						loader: "ts-loader",
					},
				},
				{
					exclude: /node_modules/,
					loader: "svg-react-loader",
					test: /\.svg$/,
				},
				{
					generator: {
						filename: "res/images/[name][ext]",
					},
					test: /\.(gif|jpg|png)$/i,
					type: "asset/resource",
				},
				{
					generator: {
						filename: "res/fonts/[name][ext]",
					},
					test: /\.(eot|otf|ttf|woff|woff2)$/,
					type: "asset/resource",
				},
				{
					test: /.s?css$/,
					use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
				},
			],
		},
		/**
		 * Provides configuration for minification, chunk splitting, etc.
		 */
		optimization: {
			minimizer: [
				// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
				// `...`,
				new CssMinimizerPlugin(),
			],
			/**
			 * Defines how webpack will create runtime file.
			 */
			runtimeChunk: "single",
			/**
			 * Splits code into individual files per vendor using SplitChunkPlugin.
			 * https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
			 */
			splitChunks: {
				cacheGroups: {
					vendor: {
						name: (module) => module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1].replace("@", ""),
						test: /[\\/]node_modules[\\/]/,
					},
				},
				chunks: "all",
				maxInitialRequests: Infinity,
				minSize: 0,
			},
		},
		/**
		 * Tells how webpack will emit bundles.
		 */
		output: {
			/**
			 * Names created files.
			 * Using [chunkhash] allows to have unique package name per version.
			 * Every time new version is generated, a new chunkhash in the name will force browsers to reload the file.
			 */
			filename: "./src/[name].[chunkhash].js",
			/**
			 * Provides a path where to outpout newly created bundles.
			 */
			path: path.resolve(process.cwd(), "app/"),
			/**
			 * Provides a public URL of the output directory.
			 */
			publicPath: "./",
		},
		/**
		 * Provides webpack a list of plugins to use.
		 */
		plugins: [
			new MiniCssExtractPlugin(),
			/**
			 * Removes files in output path before each rebuild.
			 */
			new CleanWebpackPlugin(),
			/**
			 * Creates global constants resolved at compile time.
			 */
			new Webpack.DefinePlugin({
				"process.env": {
					APPLICATION_ROOT_PATH: JSON.stringify(APPLICATION_ROOT_PATH),
					NODE_ENV: JSON.stringify("production"),
					PLATFORM_ENV: JSON.stringify("web"),
					SERVER_URL: JSON.stringify("http://localhost:3000"),
				},
			}),
			/**
			 * Creates an index.html file on the fly using the provided file as template.
			 * It adds <link> and <script> tags for every created depency.
			 */
			new HTMLWebpackPlugin({ template: "./src/index.html" }),
		],
		/**
		 * Defines how Webpack will resolve imported modules.
		 */
		resolve: {
			/**
			 * Provides a list of extensions to resolve.
			 */
			extensions: [
				".eot",
				".jpg",
				".js",
				".jsx",
				".gif",
				".otf",
				".png",
				".svg",
				".ts",
				".tsx",
				".ttf",
				".woff",
				".woff2",
			],
			fallback: { "util": require.resolve("util/") },
		},
	};
};

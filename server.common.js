const path = require("path");
const exec = require("child_process").exec;

module.exports = {
	watch: true,
	target: "node",
	devServer: {
		hot: true,
	},
	devtool: "source-map",
	mode: "development",
	entry: path.resolve(__dirname, "src", "server", "server.ts"),
	output: {
		path: path.resolve(__dirname, "dist", "server"),
		filename: "server.js",
	},
	module: {
		rules: [
			// {
			// 	test: /\.ts$/,
			// 	loader: "babel-loader",
			// 	// use: [""],
			// },
			{
				test: /\.js$/i,
				use: ["source-map-loader"],
				enforce: "pre",
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
				exclude: "/node_modules/",
			},
		],
	},
	// plugins: [
	// 	{
	// 		apply: (compiler) => {
	// 			compiler.hooks.afterEmit.tap(
	// 				"AfterEmitPlugin",
	// 				(compilation) => {
	// 					console.log("NPM RUN START:SERVER!");
	// 					exec(
	// 						"node ./dist/server/server.js",
	// 						(err, stdout, stderr) => {
	// 							if (stdout) process.stdout.write(stdout);
	// 							if (stderr) process.stdout.write(stderr);
	// 						}
	// 					);
	// 				}
	// 			);
	// 		},
	// 	},
	// ],
};

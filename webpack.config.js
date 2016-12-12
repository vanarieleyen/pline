var path = require("path");

module.exports = {
  entry: [
  	//"webpack-dev-server/client?http://0.0.0.0:8080/",		// enable requests from any client, but seems to give problems in deployed app
  	"./client/index.js"
  ],
  output: {
		path: './build',				// output directory 
		filename: "app.js"
  },
  devServer: {		// proxy calls to server folder to backend server (lighttpd port 80)
    proxy: [
        {
            path: '/server/*',
            target: "http://localhost:80/handmade/"			// the url of the server that handles the php requests
        }
    ]
	},
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /.*script\/.*.js$/, loader: "script-loader" },					// use the script loader for files in the script folder
      { test: /\.(jpg|gif|png)$/i, loader: "base64-image-loader" },
    ]
  },
  resolve: { 
		alias: { 
			"Mithril": path.join(__dirname, "node_modules/mithril/mithril.min.js"),
			"jquery-ui": path.join(__dirname, "node_modules/jquery-ui-bundle/jquery-ui.js")
		} 
	}
}
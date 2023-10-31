const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

require('webpack')

module.exports = {
    chainWebpack: 
    /**
     * @param {chainWebpack} config
     */
    function(config) {
        config
            .entry("preload")
            .add(path.resolve("src/preload.js"))
            .end()
            .plugin("html")
            .tap(args => {
                const [options,] = args;
                options.chunks = ["preload", "chunk-vendors", "app"];
                options.chunksSortMode = 'manual';
                return args;
            })
            .end()
            .module.rule("js")
            .exclude.add(/node_modules|license\-key\.js/);

            config.module
            .rule("eslint")
            .exclude.add(/node_modules|license\-key\.js/);

            config.module
            .rule('addon')
            .type('javascript/auto')
            .test(/\addon\.info\.json$/)
            .use('babel')
                .loader('babel-loader')
                .options({
                    "presets": ["@babel/env"]
                })
                .end()
            .use('addon-loader')
                .loader('@foxitsoftware/addon-loader')
                .end()
        config.externals(['UIExtension', 'PDFViewCtrl'])
    },
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin(
              [
                  {
                      from: './node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/',
                      to: "foxit-lib",
                      force: true,
                      globOptions:{
                          ignore: [
                              "{PDFViewCtrl,UIExtension}.js",
                              "{PDFViewCtrl,UIExtension}.{vendor,polyfills}.js",
                              "preload-jr-worker.js"
                          ]
                      }
                  }
              ]
            )
        ]
    },
    devServer: {
        allowedHosts: "all",
        port: 9103
    }
};

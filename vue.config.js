const VueAutoRoutingPlugin = require("vue-auto-routing/lib/webpack-plugin")
module.exports = {
    configureWebpack: config => {
        plugins: [
            new VueAutoRoutingPlugin({
                pages: 'src/views',
                importPrefix: '@/views/'
            })
        ]
    },
    devServer: {
        port: 3000
    }
}
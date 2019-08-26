/* eslint-disable */

const path = require('path')

module.exports = {
    devServer: {
        port: 8081,     // 端口
    },
    lintOnSave: false,
    pages: {
        cover: {
            entry: 'src/pages/index/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        home: {
            entry: 'src/pages/home/main.js',
            template: 'public/home.html',
            filename: 'home.html'
        },
        docs: {
            entry: 'src/pages/docs/main.js',
            template: 'public/docs.html',
            filename: 'docs.html'
        },
        chat: {
            entry: 'src/pages/chat/main.js',
            template: 'public/chat.html',
            filename: 'chat.html'
        }
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 20480 }))
    },
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    },
};

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
        patterns: [
            path.resolve(__dirname, './src/assets/less/*.less'),
        ],
    })
  }
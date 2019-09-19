/* eslint-disable */

const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
    devServer: {
        port: 8081, // 端口
        proxy: {     // 跨域代理
            '/api': {
                target: 'http://localhost:8080',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }    
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
        },
        comp: {
            entry: 'src/pages/comp/main.js',
            template: 'public/comp.html',
            filename: 'comp.html'
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
    configureWebpack: config => {
        let plugins = [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                '\\.(' +
                ['js', 'css'].join('|') +
                ')$',
                ),
                threshold: 10240,
                minRatio: 0.8,
            }),
        ]
    }
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
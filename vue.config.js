/* eslint-disable */

const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

const cdn = {
    css: [
        // '//unpkg.com/view-design/dist/styles/iview.css'
    ],
    js: [
        '//cdn.bootcss.com/vue/2.6.10/vue.runtime.min.js',
        '//cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
        '//cdn.bootcss.com/echarts/4.4.0-rc.1/echarts.min.js',
        // '//unpkg.com/view-design/dist/iview.min.js',
        '//cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js'
    ]
}

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
        index: {
            entry: 'src/pages/index/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 20480 }))

        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

        // 如果是生产环境 index.html 中添加cdn代码
        // if (isProduction) {
        //     config.plugin('html')
        //         .tap(args => {
        //             args[0].cdn = cdn;
        //             return args;
        //         })
        // }
    },
    configureWebpack: config => {
        config.plugins.push(
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
        )
        if (isProduction) {
            config.externals = {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'echarts': 'echarts',
                // 'view-design': 'iView',
                'axios': 'axios',
            }

        }
    },
};

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/less/*.less'),
            ],
        })
}
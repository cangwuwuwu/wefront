/* eslint-disable */
module.exports = {
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
        guide: {
            entry: 'src/pages/guide/main.js',
            template: 'public/guide.html',
            filename: 'guide.html'
        },
        help: {
            entry: 'src/pages/guide/main.js',
            template: 'public/guide.html',
            filename: 'guide.html'
        },
        resources: {
            entry: 'src/pages/resources/main.js',
            template: 'public/resources.html',
            filename: 'resources.html'
        }
    },
    configureWebpack: {
        // resolve: {
        //     alias: {
        //         '@public': '../src/public',
        //     }
        // }
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 20480 }))
    }
};
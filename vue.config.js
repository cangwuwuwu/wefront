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
    }
};
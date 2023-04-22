
const development = {
    outputDir: 'dist/',
    assetsDir: 'static/vue/vue_mall',
    indexPath: 'templates/index.html',
    publicPath: '/',
};

module.exports = {
    publicPath: './',
    outputDir: '../cordova/www',   //build输出目录
    assetsDir: 'static', //静态资源目录（js, css, img）
    lintOnSave: true, //是否开启eslint
    configureWebpack: {
        devtool: 'source-map',
    },
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8081',
        proxy: {
            '/jiandan': {
                target: 'https://api.jandan.net', //API服务器的地址
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/jiandan': ''
                },
                changeOrigin: true,
            },
            '/news_api/': {
                target: 'https://i.jandan.net', //API服务器的地址
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/news_api': ''
                },
                changeOrigin: true,
            }
        },

    }
}
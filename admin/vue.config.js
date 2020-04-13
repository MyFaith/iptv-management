module.exports = {
    publicPath: '/admin/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8004',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
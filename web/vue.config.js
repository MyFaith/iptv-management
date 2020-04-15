module.exports = {
    publicPath: process.env.BASE_URL,
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
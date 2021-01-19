module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                //内部已经配置过 @
                // '@': 'src'
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views'
            }
        }
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        //跨域配置
        // proxy: {
        //     '/home': {
        //         target: 'http://localhost:5000', // 要跨域的域名
        //         changeOrigin: true, // 是否开启跨域
        //     },
        //     // '/home': {
        //     //     target: 'http://localhost:5000/', // 要跨域的域名
        //     //     changeOrigin: true, // 是否开启跨域
        //     // },
        //     //当请求 /go/basicselect 接口时，会自动在target后面拼接上
        //     // '/go': {
        //     //     target: 'http://localhost:5000', // 要跨域的域名
        //     //     changeOrigin: true, // 是否开启跨域
        //     // }
        // }
    }
}
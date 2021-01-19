import axios from 'axios'

export function request (config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/w6',
        timeout: 10000
    })

    //axios的拦截器
    //全局拦截
    // axios.interceptors

    //实例拦截
    //请求拦截
    instance.interceptors.request.use(config => {
        // console.log(config)
        //1.比如config里面的一些信息不符合服务器的要求

        //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
        
        //3.某些网络请求（比如登录(token)），必须携带一些特殊的信息
        return config
    }, err => {
        console.log(err)
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res)
        console.log('数据请求以被拦截')
        return res.data
    }, err => {
        console.log(err)
    })

    return instance(config)
}

// export function request (config) {
//     return new Promise((resolve, reject) => {
//         const instance = axios.create({
//             baseURL: 'http://localhost:5000',
//             timeout: 5000
//         })
            
//             //发送真正的网络请求
//         instance(config) 
//             .then(res => {
//                 resolve(res)
//             })
//             .catch(err => {
//                 reject(err)
//             })
//     })
// }

// export function request (config, success, failure) {
//     //1.创建axios的实例
//     const instance = axios.create({
//         baseURL: 'http://localhost:5000',
//         timeout: 5000
//     })

//     //发送真正的网络请求
//     instance(config) 
//         .then(res => {
//             // console.log(res)
//             success(res)
//         })
//         .catch(err => {
//             // console.log(err)
//             failure(err)
//         })
// }

// export function request (config) {
//     //1.创建axios的实例
//     const instance = axios.create({
//         baseURL: 'http://localhost:5000',
//         timeout: 5000
//     })

//     //发送真正的网络请求
//     instance(config.baseConfig) 
//         .then(res => {
//             // console.log(res)
//             config.success(res)
//         })
//         .catch(err => {
//             // console.log(err)
//             config.failure(err)
//         })
// }

import axios from 'axios'

export function request(config) {
        //1、创建axios实例
        const instance = axios.create({
            baseURL: 'http://152.136.185.210:7878/api/m5',
            timeout: 5000
        })

        //axios的拦截器
        instance.interceptors.request.use(config => {
            //console.log(config);
            return config
        }, err => {
            //console.log(err);
        }); //请求拦截器

        instance.interceptors.response.use(res =>{
            //console.log(res);
            return res.data
        },err => {
            console.log(err);
        }); //响应
    
        //3、发送真正的网络请求
        return instance(config)
}
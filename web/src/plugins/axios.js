import Vue from 'vue';
import axios from 'axios';

const http = axios.create({
    baseURL: '/api'
});

http.interceptors.response.use((response) => {
    if (!response.data.err) {
        return response.data;
    }
    return Promise.reject(response.data.msg || "未知错误");
},(error) => {
    return Promise.reject(error);
});
    
Vue.prototype.$http = http;
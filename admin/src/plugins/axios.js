import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:8004'
});

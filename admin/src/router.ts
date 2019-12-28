import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('./views/home.vue')
        },
        {
            path: '/category/list',
            component: () => import('./views/category/list.vue')
        },
        {
            path: '/category/add',
            component: () => import('./views/category/edit.vue')
        },
        {
            path: '/category/edit/:id',
            component: () => import('./views/category/edit.vue'),
            props: true
        }
    ]
});

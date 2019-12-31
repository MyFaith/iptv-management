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
        },
        {
            path: '/source/list',
            component: () => import('./views/source/list.vue')
        },
        {
            path: '/source/add',
            component: () => import('./views/source/edit.vue')
        },
        {
            path: '/source/edit/:id',
            component: () => import('./views/source/edit.vue'),
            props: true
        },
        {
            path: '/subscribe/list',
            component: () => import('./views/subscribe/list.vue')
        },
        {
            path: '/subscribe/add',
            component: () => import('./views/subscribe/edit.vue')
        },
        {
            path: '/subscribe/edit/:id',
            component: () => import('./views/subscribe/edit.vue'),
            props: true
        }
    ]
});

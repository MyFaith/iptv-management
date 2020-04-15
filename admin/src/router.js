import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/category/list'
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
            path: '/importSource',
            component: () => import('./views/import/index.vue')
        },
        {
            path: '/crawl/list',
            component: () => import('./views/crawl/list.vue')
        },
        {
            path: '/crawl/add',
            component: () => import('./views/crawl/edit.vue')
        },
        {
            path: '/crawl/edit/:id',
            component: () => import('./views/crawl/edit.vue'),
            props: true
        }
    ]
});

<template>
    <el-container class="container">
        <el-aside class="left-side">
            <el-menu :default-active="$route.path" class="menu" router>
                <el-submenu :index="`menu-${i}`" v-for="(menu, i) in menuList" :key="`menu-${i}`">
                    <template slot="title">
                        <i v-if="menu.icon" :class="menu.icon"></i>
                        <span>{{ menu.title }}</span>
                    </template>
                    <el-menu-item :index="item.path" v-for="(item, idx) in menu.items" :key="`menu-item-${idx}`">{{ item.title }}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="header">{{ headerName }}</el-header>
            <el-main class="content">
                <slot></slot>
            </el-main>
            <el-footer class="footer">Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['headerName'])
    },
    data() {
        return {
            menuList: [
                {
                    title: '分类管理',
                    icon: 'el-icon-tickets',
                    items: [
                        { title: '添加分类', path: '/category/add' },
                        { title: '分类列表', path: '/category/list' }
                    ]
                }
            ]
        };
    }
};
</script>

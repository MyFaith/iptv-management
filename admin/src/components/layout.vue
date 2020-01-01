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
                        { title: '分类列表', path: '/category/list' }
                    ]
                },
                {
                    title: '直播源管理',
                    icon: 'el-icon-video-camera-solid',
                    items: [
                        { title: '直播源列表', path: '/source/list' },
                        { title: '直播源订阅', path: '/subscribe/list' },
                        { title: '直播平台抓取', path: '/crawl/list' }
                    ]
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.container {
    .left-side {
        .menu {
            height: 100vh;
        }
    }
    .header,
    .footer {
        display: flex;
        align-items: center;
        font-weight: bold;
    }
}
</style>

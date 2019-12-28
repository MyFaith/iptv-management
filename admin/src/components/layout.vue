<template>
    <el-container class="container">
        <el-aside class="left-side">
            <el-menu default-active="1" class="menu" router>
                <el-submenu :index="`menu-${i}`" v-for="(menu, i) in menuList" :key="i">
                    <template slot="title">
                        <i v-if="menu.icon" :class="menu.icon"></i>
                        <span>{{ menu.title }}</span>
                    </template>
                    <el-menu-item :index="item.path" v-for="(item, idx) in menu.items" :key="idx">{{ item.title }}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="header">Header</el-header>
            <el-main class="content">
                <slot></slot>
            </el-main>
            <el-footer class="footer">Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {
    menuList = [
        {
            title: '菜单1',
            icon: 'el-icon-user',
            items: [
                { title: '菜单1-1', path: '/' },
                { title: '菜单1-1', path: '/' }
            ]
        },
        {
            title: '菜单2',
            icon: 'el-icon-location',
            items: [
                { title: '菜单2-1', path: '/1' },
                { title: '菜单2-1', path: '/2' },
                { title: '菜单2-3', path: '/3' },
                { title: '菜单2-4', path: '/4' }
            ]
        }
    ];
}
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
    }
}
</style>

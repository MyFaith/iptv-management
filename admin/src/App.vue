<template>
    <div id="app">
        <layout>
            <router-view></router-view>
        </layout>
    </div>
</template>

<script>
import Layout from './components/layout';
export default {
    components: { Layout }
};
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
}
* {
    box-sizing: border-box;
}
</style>

<template>
    <div id="app">
        <layout>
            <router-view />
        </layout>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from './components/layout.vue';

@Component({
    components: {
        Layout
    }
})
export default class App extends Vue {}
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

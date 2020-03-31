<template>
    <div class="player-wrapper">
        <DPlayer :options="playerOptions"/>
    </div>
</template>

<script>
window.Hls = require('hls.js');
window.flvjs = require('flv.js');
import DPlayer from 'vue-dplayer';
import 'vue-dplayer/dist/vue-dplayer.min.css'

export default {
    components: { DPlayer },
    data() {
        return {
            playerOptions: {
                container: document.getElementById('dplayer'),
                live: true,
                autoplay: false,
                volume: 0.5,
                video: {
                    url: 'https://live-wcloud-cdn.ysp.cctv.cn/tlivecloud-cdn.ysp.cctv.cn/001/2000210102.m3u8',
                    type: 'hls'
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.player-wrapper {
    .dplayer {
        height: 100px;
        width: 100px;
    }
}
</style>
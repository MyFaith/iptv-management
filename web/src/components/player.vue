<template>
    <div class="player-wrapper">
        <DPlayer ref="player" :options="playerOptions"/>
        <a-icon class="menu" type="menu" @click="openPlaylist" />
    </div>
</template>

<script>
window.Hls = require('hls.js');
window.flvjs = require('flv.js').default;
import DPlayer from 'vue-dplayer';
import 'vue-dplayer/dist/vue-dplayer.min.css'

export default {
    components: { DPlayer },
    props: {
        data: Object
    },
    watch: {
        data(newVal) {
            // 获取播放器实例
            const player = this.$refs.player.dp;
            // 新直播流参数
            const options = {
                url: newVal.url,
                customType: ''
            };
            // 判断hls和flv
            if (newVal.url.includes('m3u8')) {
                options.customType = 'hls';
            } else if (newVal.url.includes('flv')) {
                options.customType = 'flv';
            }
            // 切换直播并播放
            player.switchVideo(options);
            player.play();
        }
    },
    data() {
        return {
            playerOptions: {
                container: document.getElementById('dplayer'),
                live: true,
                autoplay: false,
                volume: 0.5,
                video: {
                    url: '',
                    type: ''
                }
            }
        }
    },
    methods: {
        openPlaylist() {
            this.$emit('openPlaylist');
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep .dplayer {
    height: 100%;
    width: 100%;
}
.menu {
    display: none;
}
@media (max-width: 768px) {
    .menu {
        display: block;
        position: absolute;
        top: 30px;
        left: 30px;
        color: #fff;
    }
}
</style>
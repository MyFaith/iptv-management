<template>
    <a-row class="home">
        <a-col :xs="24" :sm="24" :md="18" :xl="20">
            <Player class="player" :data="playingData" @openPlaylist="isShowPlaylist=true" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="6" :xl="4">
            <PlayList v-if="isShowPlaylist" class="playlist" @closePlaylist="isShowPlaylist=false" @switchChannel="switchChannel" />
        </a-col>
    </a-row>
</template>

<script>
import Player from '../components/player';
import PlayList from '../components/playlist';

export default {
    components: { Player, PlayList },
    data() {
        return {
            isShowPlaylist: true,
            playingData: {}
        };
    },
    methods: {
        switchChannel(data) {
            this.playingData = data;
        }
    }
};
</script>

<style lang="scss" scoped>
.home {
    height: 100vh;
    overflow: hidden;
    .player {
        height: 100vh;
    }
    .playlist {
        height: 100vh;
        overflow-y: scroll;
    }
}
@media (max-width: 768px) {
    .home {
        .playlist {
            position: fixed;
            top: 0;
            right: 0;
            z-index: 1;
        }
    }
}
</style>

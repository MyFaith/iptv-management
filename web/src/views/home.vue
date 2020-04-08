<template>
    <div class="home">
        <Player class="player" :data="playingData"/>
        <PlayList class="playlist" @switchChannel="switchChannel"/>
    </div>
</template>

<script>
import Player from '../components/player';
import PlayList from '../components/playlist';

export default {
    components: { Player, PlayList },
    data() {
        return {
            playingData: {}
        }
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
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    .player {
        flex: 3;
    }
    .playlist {
        overflow-y: scroll;
    }
}
</style>

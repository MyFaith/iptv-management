import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        headerName: ''
    },
    mutations: {
        setHeaderName(state, value) {
            state.headerName = value;
        }
    },
    actions: {}
});

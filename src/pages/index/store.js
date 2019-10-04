import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        displaystatus: false,
        token: {},
    },
    mutations: {
        isDisplayMenu(state, status) {
            state.displaystatus = status;
        },
        setToken(state, token) {
            state.token = token;
        }
    }
})


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        displaystatus: false,
        token: {},
        passStatus: 0,
    },
    mutations: {
        isDisplayMenu(state, status) {
            state.displaystatus = status;
        },
        setToken(state, token) {
            state.token = JSON.parse(token);
        },
        setPassStatus(state, status) {
            state.passStatus = status;
        }
    }
})


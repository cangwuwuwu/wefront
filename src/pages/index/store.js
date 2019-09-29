import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        displaystatus: false,
        lang: 'zh',
    },
    mutations: {
        isDisplayMenu(state, status) {
            state.displaystatus = status;
        },
        changeWebLang(state, lang) {
            state.lang = lang;
        }
    }
})


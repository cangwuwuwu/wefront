import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        myinfo: [],
        name: '',
    },
    mutations: {
        getMyInfo(state, myinfo) {
            state.myinfo = myinfo
            // console.log(state.myinfo)
        },
        setUsername(state, name) {
            state.name = name
        }
    }
})

export default store;
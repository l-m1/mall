import Vue from 'vue'
import Vuex from 'vuex'


import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
//安装vuex
Vue.use(Vuex)

const state = {
    cartList: []
}
//创建vuex
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

//导出store
export default store
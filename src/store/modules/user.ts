import Vue from 'vue'
import axios from 'axios'
import { MutationTree, ActionTree } from 'vuex'
const state: IUser = {
    user_first: '',
    user_last: ''
}

const mutations = <MutationTree<typeof state>> {
    setUser: (state, payload) => {
        state.user_first = payload.user_first
        state.user_last = payload.user_last
        console.log(state)
    }
}

const actions = <ActionTree<typeof state, any>> {
    authIn: async ({commit}, payload) => {
        console.log('COOKIES: ', Vue.cookies.get('fdsa'))
        try {
            const userRes = await axios.post('https://api.selfscale.io/login', { user_uid: 'srhodes', user_pwd: '' })
            commit('setUser', userRes.data.user)
            return userRes.data
        } catch {
            return false
        }
    }
}

export default {
    state,
    actions,
    mutations
}

interface IUser {
    user_first: string
    user_last: string
}
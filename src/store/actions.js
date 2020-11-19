import axios from 'axios'
import { categories } from '../api/categories'

let actions = {
    LOGIN_USER({ commit }, user) {
        return new Promise((resolve, reject) => {
            axios.post('http://127.0.0.1:8000/api/login', user)
                .then(response => {
                    let token = response.data.token
                    let user = response.data.user
                    let favorites = response.data.favoris
                    commit('SET_USER', { user, token })
                    commit('SET_FAVORITES', {favorites})
                    resolve(response)

                }).catch(function (error) {
                    reject(error)
                })
        })
    },

    LOGOUT_USER({ commit }, user) {
        return new Promise((resolve, reject) => {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            axios.get('http://127.0.0.1:8000/api/logout', config)
                .then(response => {
                    commit('LOGOUT')
                    resolve(response)
                })
        })
    },
    GET_CATEGORIES({ commit }) {
        categories.getCategories()
            .then(response => {
                commit('SET_CATEGORIES', response.data.categories)
            })
    },
    PUSH_TO({ commit }, fav){
        commit('PUSH_IN',fav)
    },

    DELETE_TO({ commit }, fav){
        commit('REMOVE_IN',fav)
    },
    PUSH_TO_HIDENS({ commit }, hide){
        commit('PUSH_IN_HIDENS',hide)
    },

    DELETE_TO_HIDENS({ commit }, hide){
        commit('REMOVE_IN_HIDENS',hide)
    }

}
export default actions
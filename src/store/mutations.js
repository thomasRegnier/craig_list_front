let mutations = {
    SET_USER(state, {user, token}){
        state.user = user
        state.user.token = token 
        localStorage.setItem('user', JSON.stringify(user));
    },

    LOGOUT(state){
        state.user = null
        localStorage.setItem('user', null);
    },

    SET_CATEGORIES(state, categories){
        state.categories = categories
    },

    SET_FAVORITES(state, favorites){
        console.log(favorites)
        state.favorites = favorites.favorites
        localStorage.setItem('favoris', JSON.stringify(favorites.favorites));
    },

    PUSH_IN(state, fav){
        state.favorites.push(fav)
        localStorage.setItem('favoris', JSON.stringify(state.favorites));
    },

    REMOVE_IN(state, fav){
       state.favorites.splice(state.favorites.findIndex(el => el.offer_id == fav), 1)
       localStorage.setItem('favoris', JSON.stringify(state.favorites));
    },
    SET_HIDENS(state, hidens){
        state.hidens = hidens.hidens
        localStorage.setItem('hidens', JSON.stringify(hidens.hidens));
    },

    PUSH_IN_HIDENS(state, hide){
        state.hidens.push(hide)
        localStorage.setItem('hidens', JSON.stringify(state.hidens));
    },

    REMOVE_IN_HIDENS(state, hide){
       state.hidens.splice(state.hidens.findIndex(el => el.offer_id == hide), 1)
       localStorage.setItem('hidens', JSON.stringify(state.hidens));
    }
}
export default mutations
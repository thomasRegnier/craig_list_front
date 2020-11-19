import axios from 'axios'
import store from '../store'

export const offers = {
    getOffers,
    addOffer,
    getOffer,
    getMyOffers,
    update,
    deleteOffer,
    addToFavorites,
    removeToFavorites,
    addToHiden,
    getFavoris,
    search

}


function getOffers(slug, page) {

    return new Promise((resolve, reject) => {
        let config
        if(store.state.user && store.state.user.token){
            console.log("logged")
            config  = { headers: { "Authorization": `Bearer ${store.state.user.token}` } }
        }
        axios.get(`http://127.0.0.1:8000/api/offers/${slug}?page=${page}`, config).then(response => {
            resolve(response)
        })
    })
}
function deleteOffer(token, offer) {
    return new Promise((resolve, reject) => {
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        axios.post(`http://127.0.0.1:8000/api/annonce/${offer}`, offer, config)
            .then(response => {
                console.log(response)
                resolve(response)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}

function addOffer(token, offer) {
    return new Promise((resolve, reject) => {
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        axios.post('http://127.0.0.1:8000/api/add-annonce', offer, config)
            .then(response => {
                console.log(response)
                resolve(response)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}

function update(token, offer) {
    return new Promise((resolve, reject) => {
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        axios.post('http://127.0.0.1:8000/api/edit-annonce', offer, config)
            .then(response => {
                console.log(response)
                resolve(response)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}


function getOffer(id){
    return new Promise((resolve, reject) => {
        axios.get(`http://127.0.0.1:8000/api/annonce/${id}`).then(response => {
            resolve(response)
        })
    })
}

function getMyOffers(token,page){
    console.log(page)
    return new Promise((resolve, reject) => {
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        axios.get(`http://127.0.0.1:8000/api/personnal-ads?page=${page}`, config).then(response => {
            resolve(response)
        })
        .catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

function addToFavorites(token,id){
    return new Promise((resolve, reject) => {
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        axios.post('http://127.0.0.1:8000/api/add-favoris', {id: id}, config)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

function removeToFavorites(token,id){
    return new Promise((resolve, reject) => {
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        axios.post('http://127.0.0.1:8000/api/remove-favoris', {id: id}, config)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            console.log(error)
            reject(error)
        })
    })
}


function addToHiden(token,id){
    return new Promise((resolve, reject) => {
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        axios.post('http://127.0.0.1:8000/api/add-hidens', {id: id}, config)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            console.log(error)
            reject(error)
        })
    })
}


function getFavoris(token){
    return new Promise((resolve, reject) => {
        let config = { headers: { "Authorization": `Bearer ${token}` } }
        axios.get(`http://127.0.0.1:8000/api/favoris`, config).then(response => {
            resolve(response)
        })
    })
}

function search(research){
    return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/search', {research})
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            console.log(error)
            reject(error)
        })
    })
}
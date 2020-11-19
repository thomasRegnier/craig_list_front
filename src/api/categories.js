import axios from 'axios'

export const categories = {
    getCategories,
    getCategorie,
    getOneCat
}


function getCategories() {
    return new Promise((resolve, reject) => {
        axios.get('http://127.0.0.1:8000/api/categories').then(response => {
            resolve(response)
        })
    })
}

function getCategorie(cit, cat,page) {
    return new Promise((resolve, reject) => {
        axios.get(`http://127.0.0.1:8000/api/city/${cit}/category/${cat}?page=${page}`).then(response => {
            resolve(response)
        })
    })
}

function getOneCat(id){
    return new Promise((resolve, reject) => {
        axios.get(`http://127.0.0.1:8000/api/categories/${id}`).then(response => {
            resolve(response)
        })
    })
}
import axios from 'axios'

export const subcategories = {
    getSubCategorie,
}

function getSubCategorie(city,cat,slug,page){
    console.log(slug)
    return new Promise((resolve, reject) => {
        axios.get(`http://127.0.0.1:8000/api/city/${city}/categories/${cat}/subcategories/${slug}?page=${page}`).then(response => {
            resolve(response)
        })
    })
}

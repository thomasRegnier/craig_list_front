import axios from 'axios'

export const cities = {
    getCities,
    getCity
}


function getCities() {
    return new Promise((resolve, reject) => {
        axios.get('http://127.0.0.1:8000/api/cities').then(response => {
            resolve(response)
        })
    })
}

function getCity(city) {
    return new Promise((resolve, reject) => {
        axios.get(`http://127.0.0.1:8000/api/cities/${city}`)
        .then(response => {
            resolve(response)
        })
    })
}
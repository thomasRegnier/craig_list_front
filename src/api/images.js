import axios from 'axios'

export const images = {
    deleteImage
}

function deleteImage(token, image) {
    return new Promise((resolve, reject) => {
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        axios.post('http://127.0.0.1:8000/api/images', image, config)
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
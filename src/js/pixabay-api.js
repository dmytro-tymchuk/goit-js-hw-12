import axios from 'axios';

const API_KEY = "51385266-59a206174458b904205f7b7fa";

export function getImagesByQuery(query) {
    return axios('https://pixabay.com/api/', {
        params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            
        }
    })
        .then(res => res.data.hits)
        .catch(error => {
            console.log(error.message);
        })
}
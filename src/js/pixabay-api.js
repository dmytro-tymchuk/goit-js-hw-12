import axios from 'axios';

const API_KEY = "51385266-59a206174458b904205f7b7fa";

export async function getImagesByQuery(query, page = 34) {
  try {
    const response = await axios('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page,
      }
    });
      
    // return response.data.hits;
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}
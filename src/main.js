import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions';

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".btn-load-more");

form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);

let page = 1;
let userInput = '';


async function handleSubmit(event) {
  event.preventDefault();
  userInput = event.target.elements["search-text"].value.trim();
  page = 1;
  

  if (userInput === "") {
    iziToast.warning({
      message: 'Unfortunately you cannot leave the input blank',
      position: 'topRight',
      messageColor: '#fff',
      titleColor: '#fff',
      color: '#ef4040',
      iconUrl: './img/bi_x-octagon-2.svg',
      maxWidth: 432
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const res = await getImagesByQuery(userInput);

    if (!res || res.length === 0) {
      iziToast.show({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        messageColor: '#fff',
        titleColor: '#fff',
        color: '#ef4040',
        iconUrl: './img/bi_x-octagon-2.svg',
        maxWidth: 432
      });
      return;
    }

    renderGallery(res);
    showLoadMoreButton();
    form.reset();
  } catch (error) {
    iziToast.show({
      message: 'Sorry, something went wrong. Please try again!',
      position: 'topRight',
      messageColor: '#fff',
      titleColor: '#fff',
      color: '#ef4040',
      iconUrl: './img/bi_x-octagon-2.svg',
      maxWidth: 432
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page++
  
  
  try {
    const data = await getImagesByQuery(userInput, page);
    renderGallery(data, true);
    
  } catch (error) {
    alert(error.message)
  }
}
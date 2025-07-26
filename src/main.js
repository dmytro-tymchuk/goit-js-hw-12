import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader
} from './js/render-functions';

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const userInput = event.target.elements["search-text"].value.trim();

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

  getImagesByQuery(userInput)
    .then(res => {
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
      form.reset();
    })
    .catch(() => {
      iziToast.show({
        message: 'Sorry, something went wrong. Please try again!',
        position: 'topRight',
        messageColor: '#fff',
        titleColor: '#fff',
        color: '#ef4040',
        iconUrl: './img/bi_x-octagon-2.svg',
        maxWidth: 432
      });
    })
    .finally(() => {
      hideLoader();
    });
}
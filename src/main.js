import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  hideLoaderMore,
  showLoaderMore,
} from './js/render-functions';

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".btn-load-more");

form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);

let page = 1;
let userInput = '';
let totalHitsAvailable = 0;

async function handleSubmit(event) {
  event.preventDefault();
  hideLoadMoreButton();
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
    const res = await getImagesByQuery(userInput, page);
    
    totalHitsAvailable = res.totalHits;

    if (!res.hits || res.hits.length === 0) {
      iziToast.show({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        messageColor: '#fff',
        titleColor: '#fff',
        color: '#ef4040',
        iconUrl: './img/bi_x-octagon-2.svg',
        maxWidth: 432
      });
      hideLoadMoreButton();
      return;
    }

    renderGallery(res.hits);
      const IMAGES_PER_PAGE = 15;
  const maxPage = Math.ceil(totalHitsAvailable / IMAGES_PER_PAGE);
  if (page < maxPage) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
  }
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
  hideLoadMoreButton();
  showLoaderMore();
  const IMAGES_PER_PAGE = 15;
  const maxPage = Math.ceil(totalHitsAvailable / IMAGES_PER_PAGE);
  try {
    console.log(page);
    console.log(maxPage);
    if (page >= maxPage) {
      iziToast.show({
      message: 'We are sorry, but you haveve reached the end of search results.',
      position: 'topRight',
      messageColor: '#fff',
      titleColor: '#fff',
      color: '#ef4040',
      iconUrl: './img/bi_x-octagon-2.svg',
      maxWidth: 432
      });
      hideLoadMoreButton();
      return
    }
    const data = await getImagesByQuery(userInput, page);
    renderGallery(data.hits, { append: true });

    const galleryItem = document.querySelector(".gallery .wrap");
  const cardHeight = galleryItem?.getBoundingClientRect().height || 0;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth"
    });
    if (page < maxPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
    
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
    hideLoaderMore();
  }
}


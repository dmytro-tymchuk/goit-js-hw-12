import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = null;
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loaderContainer = document.querySelector(".loader-container");
const loaderMore = document.querySelector(".loader-more")
const loaderMoreContainer = document.querySelector(".loader-more-container");
const btnLoadMore = document.querySelector(".btn-load-more");

export function createMarkup(arr) {
  return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <div class="wrap">
        <a class="gallery-item" href="${largeImageURL}">
          <img class="img" src="${webformatURL}" alt="${tags}" width="360px">
        </a>
        <ul class="list">
          <li class="list-item"><p class="label">Likes</p><p class="value">${likes}</p></li>
          <li class="list-item"><p class="label">Views</p><p class="value">${views}</p></li>
          <li class="list-item"><p class="label">Comments</p><p class="value">${comments}</p></li>
          <li class="list-item"><p class="label">Downloads</p><p class="value">${downloads}</p></li>
        </ul>
      </div>
    `;
  }).join("");
}

export function renderGallery(images, options = {}) {
  const { append = false } = options;
  const markup = createMarkup(images);

  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
  loader.classList.remove("hidden");
  loaderContainer.style.display = 'flex';

}

export function hideLoader() {
  loader.classList.add("hidden");
  loaderContainer.style.display = 'none';

}


export function showLoaderMore() {
  loaderMore.classList.remove("hidden");
  loaderMoreContainer.style.display = 'flex';

}

export function hideLoaderMore() {
  loaderMore.classList.add("hidden");
  loaderMoreContainer.style.display = 'none';
}



export function showLoadMoreButton() {
  btnLoadMore.classList.remove("hidden");
  
}

export function hideLoadMoreButton() {
  btnLoadMore.classList.add("hidden");
}
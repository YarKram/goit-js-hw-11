import Notiflix from 'notiflix';
import { refs } from './refs';
import ImagesApiService from './apiService';
import { renderImage } from './renderImage';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const imagesApi = new ImagesApiService();
refs.loadMoreBtn.style.visibility = 'collapse';

function onSubmit(evt) {
  evt.preventDefault();

  clearContainer();
  imagesApi.query = evt.currentTarget.elements.searchQuery.value
    .toLowerCase()
    .trim();
  imagesApi.resetPage();

  imagesApi.fetchImages().then(data => {
    if (data.hits.length === 0) {
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    renderImage(data.hits);
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    refs.loadMoreBtn.style.visibility = 'visible';
  });
}

function onLoadMore() {
  imagesApi.fetchImages().then(data => {
    if (data.hits.length === 0) {
      refs.loadMoreBtn.style.visibility = 'collapse';
      return Notiflix.Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    renderImage(data.hits);
    let lightbox = new SimpleLightbox('.gallery a');
    console.log(lightbox.refresh());
    lightbox.refresh();
    //     const { height: cardHeight } = document
    //   .querySelector(".gallery")
    //   .firstElementChild.getBoundingClientRect();

    // window.scrollBy({
    //   top: cardHeight * 2,
    //   behavior: "smooth",
    // });
  });
}

function clearContainer() {
  refs.collection.innerHTML = '';
}

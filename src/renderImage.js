import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function renderImage(imagesData) {
  const imageCard = imagesData
    .map(imageItem => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = imageItem;
      return `<a class="gallery__item" href="${largeImageURL}">
      <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>
</a>`;
    })
    .join('');

  refs.collection.insertAdjacentHTML('beforeend', imageCard);
  let lightbox = new SimpleLightbox('.gallery a');
}

export { renderImage };

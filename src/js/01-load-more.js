import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './api';

iziToast.settings({
  position: 'topRight',
  transitionIn: 'bounceInDown',
  closeOnEscape: true,
});

const refs = {
  input: document.querySelector('input'),
  button: document.querySelector('.js-search-button'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.js-load-more'),
};

refs.input.addEventListener('input', onInputChange);
refs.button.addEventListener('click', onClickButton);
refs.loadMore.addEventListener('click', onLoadMoreClick);

let value = '';
let page = 1;

function onInputChange(e) {
  e.preventDefault();
  value = e.target.value.trim();
}

function onClickButton(e) {
  e.preventDefault();
  clearGallery();
  checkEmptyValue() && fetchData(page, value);
}

function fetchData(page, value) {
  fetchImages(page, value)
    .then(data => {
      createMarkup(data);
    })
    .catch(err => {
      iziToast.error({
        message: 'Something went wrong :-( try again later.',
      });
    });
}

function createMarkup({ hits, totalHits }) {
  if (hits.length === 0) {
    return iziToast.info({
      message:
        'Sorry, there are no images matching your search query. Please try again.',
    });
  }
  showLoadMore(totalHits);
  hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      const imgMarkup = `
        <li class="photo-card">
          <a class="gallery-link" href = ${largeImageURL}>
            <img src=${webformatURL} alt=${tags} loading="lazy" />
          </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <span>${numberWithSpaces(likes)}</span>
              </p>
              <p class="info-item">
                <b>Views</b>
                <span>${numberWithSpaces(views)}</span>
              </p>
              <p class="info-item">
                <b>Comments</b>
                <span>${numberWithSpaces(comments)}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <span>${numberWithSpaces(downloads)}</span>
              </p>
            </div>
          </li>`;
      lightbox.refresh();
      refs.gallery.insertAdjacentHTML('beforeend', imgMarkup);
    }
  );
  checkPageNumber(page, totalHits);
}

function onLoadMoreClick(e) {
  e.preventDefault();
  page += 1;
  fetchData(page, value);
}

function clearGallery() {
  page = 1;
  refs.gallery.innerHTML = '';
  refs.loadMore.classList.add('hide');
}

function checkEmptyValue() {
  if (value.length === 0) {
    refs.input.value = '';
    iziToast.warning({
      message: 'You should enter something to input!',
    });
    return false;
  }
  return true;
}

function showLoadMore(totalHits) {
  if (page >= Math.ceil(totalHits / 40)) {
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });
    refs.loadMore.classList.add('hide');
  } else {
    refs.loadMore.classList.remove('hide');
  }
}

function checkPageNumber(page, totalHits) {
  if (page === 1) {
    iziToast.success({
      message: `Hooray! We found ${totalHits} images.`,
    });
  } else {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth',
    });
  }
}

function numberWithSpaces(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const lightbox = new SimpleLightbox('.photo-card a', {
  sourceAttr: 'href',
  overlay: true,
  nav: true,
});

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
  guard: document.querySelector('.js-guard'),
};

refs.input.addEventListener('input', onInputChange);
refs.button.addEventListener('click', onClickButton);

let value = '';
let page = 1;
let totalPages = 0;

const observerOptions = {
  root: null,
  rootMargin: window.innerHeight * 0.5 + 'px',
  threshold: 0,
};

let observer = new IntersectionObserver(onLoadMore, observerOptions);

function onInputChange(e) {
  e.preventDefault();
  value = e.target.value.trim();
}

function onClickButton(e) {
  e.preventDefault();
  clearGallery();
  checkEmptyValue() && fetchData(page, value);
}

async function fetchData(page, value) {
 await fetchImages(page, value)
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
  showSuccessMessage(page, totalHits);
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
  totalPages = Math.ceil(totalHits / 40);
  observer.observe(refs.guard);
}

function clearGallery() {
  page = 1;
  totalPages = 0;
  observer.disconnect(refs.guard);
  refs.gallery.innerHTML = '';
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

function showSuccessMessage(page, totalHits) {
  if (page === 1) {
    iziToast.success({
      message: `Hooray! We found ${totalHits} images.`,
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

function onLoadMore(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      if (page <= totalPages) {
        fetchData(page, value);
      } else {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    }
  });
}

import axios from 'axios';
import iziToast from 'izitoast';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23089683-10e6383e94187ff47334541d4';
const URL_PARAMS = {
  key: '',
  page: 1,
  per_page: 40,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  q: '',
};

const refs = {
  input: document.querySelector('input'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

refs.input.addEventListener('input', onInputChange);
refs.button.addEventListener('click', onClickButton);
refs.loadMore.addEventListener('click', onLoadMoreClick);

let value = '';

// refs.loadMore.classList.add('hide');

function onInputChange(e) {
  e.preventDefault();
  value = e.target.value.trim();
}

function onClickButton(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  if (value.length === 0) {
    refs.input.value = '';
    return iziToast.info({
      message: 'You should enter something to input!',
    });
  }
  fetchImages(value);
}

async function fetchImages(value) {
  try {
    const { data } = await axios(
      createURL(BASE_URL, API_KEY, URL_PARAMS, value)
    );
    createMarkup(data);
    checkHitsNumber(data);
  } catch (error) {
    return iziToast.error({
      message: 'Something went wrong :-( try again later.',
    });
  }
}

function createURL(url, api, params, value) {
  return (
    url +
    '?' +
    Object.keys(params)
      .map(paramsKey => {
        switch (paramsKey) {
          case 'key':
            return paramsKey.concat('=', api);
          case 'q':
            return paramsKey.concat('=', value);
          default:
            return paramsKey.concat('=', params[paramsKey]);
        }
      })
      .join('&')
  );
}

function createMarkup(data) {
  const { hits } = data;
  if (hits.length === 0) {
    return iziToast.info({
      message:
        'Sorry, there are no images matching your search query. Please try again.',
    });
  }
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
        <div class="photo-card">
          <img src=${webformatURL} alt=${tags} loading="lazy" />
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
        </div>`;
      refs.gallery.insertAdjacentHTML('beforeend', imgMarkup);
    }
  );
}

function numberWithSpaces(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function onLoadMoreClick(e) {
  e.preventDefault();
  // const pageCount =
  URL_PARAMS.page += 1;
  fetchImages(value);
}

function checkHitsNumber(data) {
  const { hits, totalHits } = data;
  console.log(data);
  if (hits.length <= URL_PARAMS.per_page) {
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    refs.loadMore.classList.remove('hide');
  }

  // if (hits.length > 11) {
  //   refs.loadMoreBtn.style.visibility = 'visible';
  // } else {
  //   refs.loadMoreBtn.style.visibility = 'hidden';
  //   showAlert();
  // }
}

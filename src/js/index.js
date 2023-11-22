import axios from 'axios';

const API_KEY = '23089683-10e6383e94187ff47334541d4';
const URL = 'https://pixabay.com/api/';

const example =
  'https://pixabay.com/api/?key=23089683-10e6383e94187ff47334541d4&q=yellow+flowers&image_type=photo';

const refs = {
  //   form: document.querySelector('form'),
  input: document.querySelector('input'),
  button: document.querySelector('button'),
  list: document.querySelector('.img-list'),
};

refs.input.addEventListener('input', onInputChange);
refs.button.addEventListener('click', onClickButton);

let value = '';

function onInputChange(e) {
  e.preventDefault();
  value = e.target.value;
}

function onClickButton(e) {
  e.preventDefault();
  fetchImages(value);
}

async function fetchImages(value) {
  return await axios(
    `${URL}?key=${API_KEY}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true&q=${value}`
  )
    .then(({ data }) => createMarkup(data))
    .catch(err => console.log(err.message))
    .finally(() => console.log('Finally'));
}

function createMarkup(data) {
  refs.list.innerHTML = '';
  const markup = '';
  const { hits } = data;
  console.log(hits);
  //   hits.map(({ largeImageURL, tags }) => {
  //     console.log(largeImageURL);
  //     console.log(markup);
  //     const imgMarkup = `<li>
  //       <img src=${largeImageURL} alt=${tags} width="200px">
  //     </li>`;
  //     return (markup = markup + imgMarkup);
  //   });
  hits.map(({ largeImageURL, tags }) => {
    const imgMarkup = `<li>
      <img src=${largeImageURL} alt=${tags} width="200px">
    </li>`;
    refs.list.insertAdjacentHTML('beforeend', imgMarkup);
  });
  console.log('markup: ', markup);
}

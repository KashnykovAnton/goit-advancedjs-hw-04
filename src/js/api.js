import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23089683-10e6383e94187ff47334541d4';
const URL_PARAMS = {
  key: API_KEY,
  per_page: 40,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const urlParams = new URLSearchParams(URL_PARAMS);

async function fetchImages(page, value) {
  const { data } = await axios(
    `${BASE_URL}?${urlParams}&page=${page}&q=${value}`
  );
  return data;
}

export { fetchImages };

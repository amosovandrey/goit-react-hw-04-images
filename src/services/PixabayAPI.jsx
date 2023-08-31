import axios from 'axios';

export const fetchImages = async (query, page) => {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '37648737-76093e0db6038ebde4a82f299';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: false,
    page: page,
    per_page: 12,
  });

  const { data } = await axios.get(`${BASE_URL}/?${searchParams}`);
  return data;
};

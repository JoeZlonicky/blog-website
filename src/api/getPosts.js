import { axios } from './axios.js';

async function getPosts() {
  const res = await axios.get('/posts');
  return res.data.results;
}

export { getPosts };

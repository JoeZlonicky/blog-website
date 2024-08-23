import { axios } from './axios.js';

async function getPost(id) {
  const res = await axios.get(`/posts/${id}`);
  return res.data;
}

export { getPost };

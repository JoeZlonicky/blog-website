import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BLOG_API_URL,
});

export { axios };

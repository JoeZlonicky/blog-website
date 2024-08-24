import { axios } from './axios.js';
import type { Post } from '@/types/Post.js';

async function getPosts(): Promise<Post[]> {
  const res = await axios.get('/posts');
  const posts: Post[] = res.data.results;
  return posts;
}

export { getPosts };

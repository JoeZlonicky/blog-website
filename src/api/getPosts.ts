import { api } from './api.js';
import { parsePostDates } from './parsePostDates.js';
import type { Post } from '@/types/Post.js';

async function getPosts(): Promise<Post[]> {
  const res = await api.get('/posts');
  const posts: Post[] = res.data.results;
  posts.forEach((post) => {
    parsePostDates(post);
  });
  return posts;
}

export { getPosts };

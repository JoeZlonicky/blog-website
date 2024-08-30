import { api } from './api';
import { parsePostDates } from './parsePostDates';
import type { Post } from '@/types/Post';

async function getPosts(): Promise<Post[]> {
  const res = await api.get('/posts');
  const posts: Post[] = res.data;
  posts.forEach((post) => {
    parsePostDates(post);
  });
  return posts;
}

export { getPosts };

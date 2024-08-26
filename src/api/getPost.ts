import { axios } from './axios';
import { parsePostDates } from './parsePostDates';
import type { Post } from '@/types/Post';

async function getPost(id: number): Promise<Post> {
  const res = await axios.get(`/posts/${id}`);
  const post: Post = res.data;
  parsePostDates(post);
  return post;
}

export { getPost };

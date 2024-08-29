import { api } from './api';

async function postComment(
  postId: number,
  content: string,
  firstName: string,
  lastInitial: string,
) {
  await api.post('/comments', { postId, content, firstName, lastInitial });
}

export { postComment };

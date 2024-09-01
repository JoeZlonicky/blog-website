import type { Post } from '@/types/Post';

function parsePostDates(post: Post) {
  post.publishedAt = new Date(post.publishedAt);
  post.comments.forEach((comment) => {
    comment.createdAt = new Date(comment.createdAt);
  });
}

export { parsePostDates };

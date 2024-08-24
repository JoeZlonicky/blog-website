import type { Author } from './Author';

type Comment = {
  id: number;
  content: string;

  createdAt: Date;
  updatedAt: Date;

  authorId: number;
  author: Author;

  postId: number;
};

export type { Comment };

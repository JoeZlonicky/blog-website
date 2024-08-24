import type { Author } from './Author';
import type { Comment } from './Comment';

type Post = {
  id: number;
  title: string;
  content?: string;

  createdAt: Date;
  updatedAt: Date;
  published: boolean;

  comments: Comment[];

  authorId: number;
  author: Author;
};

export type { Post };

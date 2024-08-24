import type { Post } from '@/types/Post';
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

const usePostsStore = defineStore('posts', () => {
  const posts: Ref<Post[] | null> = ref(null);
  return { posts };
});

export { usePostsStore };

import { defineStore } from 'pinia';
import { ref } from 'vue';

const usePostsStore = defineStore('posts', () => {
  const posts = ref(null);
  return { posts };
});

export { usePostsStore };

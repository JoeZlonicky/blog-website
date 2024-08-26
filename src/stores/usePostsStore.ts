import { getPost } from '@/api/getPost';
import { getPosts } from '@/api/getPosts';
import type { Post } from '@/types/Post';
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

const usePostsStore = defineStore('posts', () => {
  const cachedPosts: Ref<Map<number, Post>> = ref(new Map());
  const cachedFeed: Ref<Post[]> = ref([]);

  const totalPostCount: Ref<number | undefined> = ref(undefined);
  const hasDoneFirstFetch: Ref<boolean> = ref(false);
  const didLastFetchSucceed: Ref<boolean | undefined> = ref(undefined);
  const isFetching: Ref<boolean> = ref(false);

  async function fetchPosts() {
    isFetching.value = true;

    try {
      const posts = await getPosts();
      cachedPosts.value = new Map();
      cachedFeed.value = [];

      posts.forEach((post) => {
        cachedFeed.value.push(post);
        cachedPosts.value.set(post.id, post);
      });

      didLastFetchSucceed.value = true;
      hasDoneFirstFetch.value = true;
    } catch (err) {
      didLastFetchSucceed.value = false;
    } finally {
      isFetching.value = false;
    }
  }

  async function fetchSpecificPost(postId: number) {
    if (cachedPosts.value.has(postId)) return;

    isFetching.value = true;
    try {
      const post = await getPost(postId);
      cachedPosts.value.set(postId, post);
      didLastFetchSucceed.value = true;
    } catch (err) {
      didLastFetchSucceed.value = false;
    } finally {
      isFetching.value = false;
    }
  }

  return {
    cachedPosts,
    cachedFeed,
    fetchPosts,
    fetchSpecificPost,
    totalPostCount,
    hasDoneFirstFetch,
    didLastFetchSucceed,
    isFetching,
  };
});

export { usePostsStore };

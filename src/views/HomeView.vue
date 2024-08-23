<script setup>
import { getPosts } from '@/api/getPosts.js';
import PostPreview from '@/components/PostPreview.vue';
import { usePostsStore } from '@/stores/usePostsStore.js';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { VueSpinnerSquare } from 'vue3-spinners';

const postsStore = usePostsStore();
const { posts } = storeToRefs(postsStore);

const isFetching = ref(!posts.value);
const wasFetchSuccessfull = ref(!!posts.value);

async function fetchPosts() {
  try {
    posts.value = await getPosts();
    wasFetchSuccessfull.value = true;
  } catch (err) {
    wasFetchSuccessfull.value = false;
  }

  isFetching.value = false;
}

onMounted(async () => {
  if (!posts.value) {
    await fetchPosts();
  }
});
</script>

<template>
  <main>
    <h1 class="mb-4">Welcome to <span class="font-bold">TheBlog</span></h1>
    <div v-if="isFetching">
      <VueSpinnerSquare class="mx-auto !bg-white"></VueSpinnerSquare>
    </div>
    <p v-else-if="!wasFetchSuccessfull">Failed to load posts.</p>
    <p v-else-if="posts.length === 0">No posts.</p>
    <div v-else class="mx-auto flex max-w-4xl flex-col gap-4 px-4">
      <PostPreview v-for="post in posts" :key="post.id" :post />
    </div>
  </main>
</template>

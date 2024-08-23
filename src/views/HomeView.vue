<script setup>
import { getPosts } from '@/api/getPosts.js';
import PostPreview from '@/components/PostPreview.vue';
import { usePostsStore } from '@/stores/usePostsStore.js';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

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
    <h1>Welcome to <span class="font-bold">TheBlog</span></h1>
    <p v-if="isFetching">Fetching posts...</p>
    <p v-else-if="!wasFetchSuccessfull">Failed to fetch posts.</p>
    <p v-else-if="posts.length === 0">No posts.</p>
    <div v-else class="mx-auto flex max-w-4xl flex-col gap-4 px-4">
      <PostPreview v-for="post in posts" :key="post.id" :post />
    </div>
  </main>
</template>

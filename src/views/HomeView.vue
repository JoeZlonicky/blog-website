<script setup lang="ts">
import PostPreview from '@/components/PostPreview.vue';
import { usePostsStore } from '@/stores/usePostsStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const postsStore = usePostsStore();
const { cachedFeed, didLastFetchSucceed, isFetching, hasDoneFirstFetch } =
  storeToRefs(postsStore);

onMounted(async () => {
  if (!hasDoneFirstFetch.value) {
    await postsStore.fetchPosts();
  }
});
</script>

<template>
  <main>
    <h1 class="mb-4">Welcome to <span class="font-bold">TheBlog</span></h1>
    <p v-if="isFetching">Loading posts...</p>
    <p v-else-if="!didLastFetchSucceed">Failed to load posts.</p>
    <p v-else-if="cachedFeed?.length === 0">No posts.</p>
    <div v-else class="mx-auto flex max-w-4xl flex-col gap-4 px-4">
      <PostPreview v-for="post in cachedFeed" :key="post.id" :post />
    </div>
  </main>
</template>

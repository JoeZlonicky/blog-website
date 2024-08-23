<script setup>
import { getPosts } from '@/api/getPosts.js';
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
    <h1 class="text-3xl">Welcome to the blog!</h1>
    <p v-if="isFetching">Fetching posts...</p>
    <p v-else-if="!wasFetchSuccessfull">Failed to fetch posts.</p>
    <p v-else-if="posts.length === 0">No posts.</p>
    <div v-else>
      <div v-for="post in posts" :key="post.id">
        {{ post.title }} by {{ post.author.username }}
      </div>
    </div>
  </main>
</template>

<script setup>
import { getPosts } from '@/api/getPosts.js';
import { onMounted, ref } from 'vue';

const posts = ref([]);
const isFetching = ref(true);
const wasFetchSuccessfull = ref(undefined);

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
  await fetchPosts();
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

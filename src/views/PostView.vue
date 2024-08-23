<script setup>
import { getPost } from '@/api/getPost.js';
import { format } from 'date-fns';
import { onMounted, ref, watch } from 'vue';
import { VueSpinnerSquare } from 'vue3-spinners';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);

const isFetching = ref(!post.value);
const wasFetchSuccessfull = ref(!!post.value);

async function fetchPost() {
  try {
    post.value = await getPost(route.params.postId);
    wasFetchSuccessfull.value = true;
  } catch (err) {
    wasFetchSuccessfull.value = false;
  }

  isFetching.value = false;
}

onMounted(async () => {
  await fetchPost();
});

watch(
  () => route.params.postId,
  async () => {
    await fetchPost();
  },
);

function formatDateString(dateString) {
  return format(dateString, 'MMM. do, yyyy');
}
</script>

<template>
  <div class="px-4">
    <main
      class="mx-auto my-8 flex min-h-32 max-w-6xl flex-col items-center bg-slate-700 px-4 pt-0"
    >
      <div v-if="isFetching" class="flex flex-1 flex-col justify-center">
        <VueSpinnerSquare class="mx-auto !bg-white"></VueSpinnerSquare>
      </div>

      <p v-else-if="!wasFetchSuccessfull">Failed to load post.</p>

      <template v-else>
        <h1>{{ post.title }}</h1>
        <div class="font-light">
          {{ formatDateString(post.createdAt) }} |
          <span class="font-medium">By {{ post.author.username }}</span>
        </div>
        <div class="mb-8 mt-2 max-w-3xl text-left">
          {{ post.content }}
        </div>
      </template>
    </main>

    <template v-if="post">
      <h2 class="text-center text-3xl">Comments</h2>
      <p v-if="post.comments.length === 0" class="mt-2 text-center">
        No comments so far!
      </p>
      <div v-else>
        <div v-for="comment in post.comments" :key="comment.id">
          <div>{{ comment.content }}</div>
          {{ comment.author.username }} |
          {{ formatDateString(comment.createdAt) }}
        </div>
      </div>
    </template>
  </div>
</template>

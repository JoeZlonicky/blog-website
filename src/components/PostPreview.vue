<script setup lang="ts">
import type { Post } from '@/types/Post.js';
import formatDate from '@/utility/formatDate';
import { RouterLink } from 'vue-router';

defineProps<{
  post: Post;
}>();
</script>

<template>
  <article
    class="relative flex flex-col gap-1 bg-slate-700 p-4 text-start hover:bg-slate-600"
  >
    <RouterLink
      :to="`posts/${post.id}`"
      class="absolute inset-0 cursor-pointer"
    ></RouterLink>
    <div class="text-2xl font-bold">{{ post.title }}</div>
    <div class="font-light">
      {{ formatDate(post.createdAt) }} |
      <span class="font-medium">By {{ post.author.username }}</span>
    </div>

    <div>
      {{ post.comments.length }}
      {{ post.comments.length === 1 ? 'comment' : 'comments' }}
    </div>
  </article>
</template>

<script setup lang="ts">
import NameAndDate from './NameAndDate.vue';
import type { Post } from '@/types/Post.js';
import { RouterLink } from 'vue-router';

defineProps<{
  post: Post;
}>();
</script>

<template>
  <article
    class="bg-primary hover:bg-primary-highlight relative flex flex-col gap-1 p-4 text-start"
  >
    <RouterLink
      :to="`posts/${post.id}`"
      class="absolute inset-0 cursor-pointer"
      :aria-label="post.title"
    ></RouterLink>
    <div class="text-2xl font-bold">{{ post.title }}</div>
    <div>
      <NameAndDate
        :name="`${post.author.firstName} ${post.author.lastName}`"
        :date="post.createdAt"
      />
    </div>

    <div>
      {{ post.comments.length }}
      {{ post.comments.length === 1 ? 'comment' : 'comments' }}
    </div>
  </article>
</template>

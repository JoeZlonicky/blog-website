<script setup lang="ts">
import NameAndDate from './NameAndDate.vue';
import type { Post } from '@/types/Post';
import { RouterLink } from 'vue-router';

defineProps<{
  post: Post;
}>();
</script>

<template>
  <article
    class="relative flex flex-col gap-1 bg-primary p-4 text-start shadow-md hover:bg-primary-highlight"
  >
    <RouterLink
      :to="`post/${post.id}`"
      class="absolute inset-0 cursor-pointer"
      :aria-label="post.title"
    ></RouterLink>
    <div class="text-2xl font-bold capitalize">{{ post.title }}</div>
    <div>
      <NameAndDate
        :name="`${post.author.firstName} ${post.author.lastName}`"
        :date="post.publishedAt"
      />
    </div>

    <div>
      {{ post.comments.length }}
      {{ post.comments.length === 1 ? 'comment' : 'comments' }}
    </div>
  </article>
</template>

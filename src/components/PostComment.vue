<script setup lang="ts">
import type { Comment } from '@/types/Comment';
import formatDate from '@/utility/formatDate';

defineProps<{
  comment: Comment;
}>();
</script>
<template>
  <div class="flex flex-col gap-2 bg-slate-700 px-4 py-4">
    <div class="text-lg">{{ comment.content }}</div>
    <div>
      <span class="font-medium">{{ comment.author.username }}</span> |
      <span class="font-light">{{ formatDate(comment.createdAt) }}</span>
    </div>
  </div>
</template>

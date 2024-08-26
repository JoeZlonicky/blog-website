<script setup lang="ts">
import NameAndDate from './NameAndDate.vue';
import type { Comment } from '@/types/Comment';

defineProps<{
  comment: Comment;
}>();
</script>
<template>
  <div class="bg-fg-color px-4 py-4">
    <div class="mb-1">
      <NameAndDate
        :name="comment.firstName + comment.lastInitial"
        :date="comment.createdAt"
      />
    </div>
    <div class="text-lg">{{ comment.content }}</div>
  </div>
</template>

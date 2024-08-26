<script setup lang="ts">
import { format } from 'date-fns';

defineProps<{
  name: string;
  date: Date;
}>();

function formatDate(date: Date): string {
  return format(date, 'MMM. do, yyyy');
}
</script>

<template>
  <span class="font-medium">{{ name }}</span> |
  <span class="font-light">{{ formatDate(date) }}</span>
</template>

<script setup lang="ts">
import PostComment from '@/components/PostComment.vue';
import { usePostsStore } from '@/stores/usePostsStore';
import type { Post } from '@/types/Post';
import formatDate from '@/utility/formatDate';
import { storeToRefs } from 'pinia';
import { type Ref, onMounted, ref, watch } from 'vue';
import { VueSpinnerSquare } from 'vue3-spinners';
import { useRoute } from 'vue-router';

const route = useRoute();

const post: Ref<Post | undefined> = ref(undefined);

const postsStore = usePostsStore();
const { didLastFetchSucceed, isFetching, cachedPosts } =
  storeToRefs(postsStore);

async function updatePost() {
  const postId = parseInt(route.params.postId as string);
  await postsStore.fetchSpecificPost(postId);
  post.value = cachedPosts.value.get(postId);
}

onMounted(async () => updatePost());

watch(
  () => route.params.postId,
  async () => updatePost(),
);
</script>

<template>
  <div class="mx-auto max-w-6xl px-4">
    <main
      class="my-8 flex min-h-32 flex-col items-center bg-slate-700 px-4 pt-0"
    >
      <div v-if="isFetching" class="flex flex-1 flex-col justify-center">
        <VueSpinnerSquare class="mx-auto !bg-white"></VueSpinnerSquare>
      </div>

      <p v-else-if="!didLastFetchSucceed">Failed to load post.</p>

      <template v-else-if="post">
        <h1>{{ post?.title }}</h1>
        <div>
          <span clas="font-light">{{ formatDate(post.createdAt) }}</span> | By
          <span class="font-medium"
            >{{ post.author.firstName }} {{ post.author.lastName }}</span
          >
        </div>
        <div class="mb-8 mt-2 max-w-3xl text-left text-lg">
          {{ post?.content }}
        </div>
      </template>
    </main>

    <template v-if="post">
      <h2 class="mb-4 text-center text-3xl">Comments</h2>
      <p v-if="post.comments.length === 0" class="mt-2 text-center">
        No comments so far!
      </p>
      <div class="mx-auto max-w-2xl px-2" v-else>
        <PostComment
          v-for="comment in post.comments"
          :key="comment.id"
          :comment
        />
      </div>
    </template>
  </div>
</template>

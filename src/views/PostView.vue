<script setup lang="ts">
import NameAndDate from '@/components/NameAndDate.vue';
import NewCommentForm from '@/components/NewCommentForm.vue';
import PostComment from '@/components/PostComment.vue';
import { usePostsStore } from '@/stores/usePostsStore';
import type { Post } from '@/types/Post';
import { storeToRefs } from 'pinia';
import { type Ref, onMounted, ref, watch } from 'vue';
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
    <main class="bg-primary my-8 flex min-h-32 flex-col items-center px-4 pt-0">
      <p v-if="isFetching" class="my-auto">Loading post...</p>
      <p v-else-if="!didLastFetchSucceed" class="my-auto">
        Failed to load post.
      </p>
      <template v-else-if="post">
        <h1>{{ post?.title }}</h1>
        <div>
          <NameAndDate
            :name="`${post.author.firstName} ${post.author.lastName}`"
            :date="post.createdAt"
          />
        </div>
        <div class="mb-8 mt-2 max-w-3xl text-left text-lg">
          {{ post?.content }}
        </div>
      </template>
    </main>

    <template v-if="post">
      <NewCommentForm class="mx-auto mb-4 max-w-2xl" :post-id="post.id" />
      <h2 class="mb-4 text-center text-3xl">Comments</h2>
      <p v-if="post.comments.length === 0" class="text-center">
        No comments so far!
      </p>
      <div v-else class="mx-auto flex max-w-2xl flex-col gap-2">
        <PostComment
          v-for="comment in post.comments"
          :key="comment.id"
          :comment
        />
      </div>
    </template>
  </div>
</template>

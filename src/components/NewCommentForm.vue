<script setup lang="ts">
import { postComment } from '@/api/postComment';
import { type Ref, defineModel, ref } from 'vue';

const props = defineProps<{
  postId: number;
}>();

const form = ref<HTMLFormElement | null>(null);
const content = defineModel<string>('content');
const firstName = defineModel<string>('firstName');
const lastInitial = defineModel<string>('lastInitial');

enum Status {
  None,
  Submitting,
  SubmitSucceeded,
  SubmitFailed,
}

const submitStatus: Ref<Status> = ref(Status.None);

function resetForm() {
  content.value = '';
  firstName.value = '';
  lastInitial.value = '';
  form.value?.reset();
}

async function onFormSubmit() {
  if (submitStatus.value === Status.Submitting) {
    return;
  }

  submitStatus.value = Status.Submitting;
  try {
    await postComment(
      props.postId,
      content.value as string,
      firstName.value as string,
      lastInitial.value as string,
    );
    submitStatus.value = Status.SubmitSucceeded;
    resetForm();
  } catch (err) {
    submitStatus.value = Status.SubmitFailed;
  }
}
</script>
<template>
  <form
    ref="form"
    @submit.prevent="onFormSubmit"
    class="flex flex-col gap-4 bg-fg-color p-4"
  >
    <div>
      <label for="comment-content" class="mb-2 block text-lg"
        >Leave a comment:</label
      >
      <textarea
        v-model="content"
        id="comment-content"
        class="min-h-24 w-full p-1"
        required
      ></textarea>
    </div>

    <div class="flex flex-wrap gap-4">
      <span class="flex items-center gap-2">
        <label for="first-name">First name:</label>
        <input
          v-model="firstName"
          id="first-name"
          class="capitalize"
          pattern="[a-zA-Z]+"
          title="Characters with no spaces"
          required
        />
      </span>
      <span class="flex items-center gap-2">
        <label for="last-initial">Last initial:</label>
        <input
          v-model="lastInitial"
          id="last-initial"
          class="w-10 capitalize"
          pattern="[a-zA-Z]+"
          title="A single character"
          maxlength="1"
          required
        />
      </span>
    </div>

    <div>
      <label for="understand"
        >I understand that this comment will undergo approval and cannot be
        edited or deleted once submitted:</label
      >
      <input class="ml-2" type="checkbox" id="understand" required />
    </div>

    <p v-if="submitStatus === Status.Submitting" class="text-center">
      Submitting...
    </p>
    <p
      v-else-if="submitStatus === Status.SubmitFailed"
      class="text-center font-bold"
    >
      Failed to submit.
    </p>
    <p
      v-else-if="submitStatus === Status.SubmitSucceeded"
      class="text-center font-bold"
    >
      Submitted!
    </p>
    <button type="submit">Submit</button>
  </form>
</template>

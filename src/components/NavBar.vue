<script setup lang="ts"></script>
<template>
  <header class="bg-fg-color text-3xl">
    <div v-if="$route.fullPath === '/'" class="px-8 py-4">
      <span class="font-bold">TheBlog</span
      ><span class="text-lg"> By Joe Zlonicky</span>
    </div>
    <nav v-else>
      <RouterLink to="/" class="hover:bg-fg-highlight-color block px-8 py-4">
        &larr; All Posts
      </RouterLink>
    </nav>
  </header>
</template>

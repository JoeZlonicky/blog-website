<script setup lang="ts"></script>
<template>
  <header class="bg-primary text-3xl shadow-md">
    <div v-if="$route.fullPath === '/'" class="px-8 py-4">
      <span class="text-accent font-bold">TheBlog</span
      ><span class="text-lg"> By Joe Zlonicky</span>
    </div>
    <nav v-else>
      <RouterLink
        to="/"
        class="text-accent hover:bg-primary-highlight block px-8 py-4 font-bold"
      >
        &larr; All Posts
      </RouterLink>
    </nav>
  </header>
</template>

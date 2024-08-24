<script setup lang="ts"></script>
<template>
  <header
    class="flex items-stretch justify-between bg-slate-700 px-8 font-bold shadow-xl"
  >
    <RouterLink to="/" class="px-8 py-4 text-3xl">TheBlog</RouterLink>
    <nav class="flex gap-4 text-xl">
      <RouterLink
        class="flex h-full items-center px-8 hover:bg-slate-600"
        to="/"
        >Home</RouterLink
      >
      <RouterLink
        class="flex h-full items-center px-8 hover:bg-slate-600"
        to="/about"
        >About</RouterLink
      >
    </nav>
  </header>
</template>

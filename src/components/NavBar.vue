<template>
  <header
    class="flex items-stretch justify-between bg-slate-700 px-8 font-bold"
  >
    <RouterLink to="/" class="px-8 py-4 text-3xl">Blog</RouterLink>
    <nav class="flex gap-4 text-xl">
      <RouterLink class="my-auto px-8" to="/">Home</RouterLink>
      <RouterLink class="my-auto px-8" to="/about">About</RouterLink>
    </nav>
  </header>
</template>

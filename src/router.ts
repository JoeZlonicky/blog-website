import HomeView from './views/HomeView.vue';
import PostView from './views/PostView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/posts/:postId',
      name: 'posts',
      component: PostView,
    },
  ],
});

export { router };

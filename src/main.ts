import App from './App.vue';
import './assets/style.css';
import { router } from './router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router);

app.mount('#app');

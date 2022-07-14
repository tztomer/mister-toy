import { createRouter, createWebHashHistory } from 'vue-router';
import toyApp from '../views/toy-app.vue';
import toyDetails from '../views/toy-details.vue';
const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'toy-app',
      component: toyApp,
    },
    {
      path: '/toy/details/:toyId',
      name: 'toy-details',
      component: toyDetails,
    },
  ],
});

export default router;

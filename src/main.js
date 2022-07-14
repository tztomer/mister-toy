import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.config.globalProperties.$filters = {
  createdAt(timestamp) {
    // look implementation inside car-preview.vue
    let createTime;
    const options = { month: 'long', year: 'numeric', weekday: 'long', undefined };

    createTime = new Date(timestamp).toLocaleDateString(undefined, options);

    return createTime;
  },
  inStock(boolean) {
    return boolean ? 'In stock' : 'Out of stock';
  },
  toyCategories(arr) {
    return arr.splice(',').join(' | ');
  },
};

app.use(router);
app.use(store);
app.mount('#app');

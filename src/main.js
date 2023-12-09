import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n';
import router from './router'




createApp(App).use(router).use(i18n).mount('#app')

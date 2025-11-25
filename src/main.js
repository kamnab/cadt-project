
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initAuthListeners } from '@/services/authService';

// Initialize authentication listeners early in the app lifecycle
initAuthListeners();

const app = createApp(App)



app.use(createPinia())
app.use(router)

app.mount('#kt_wrapper')

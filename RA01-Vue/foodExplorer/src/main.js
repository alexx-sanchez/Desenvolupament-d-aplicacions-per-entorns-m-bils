import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/recetas.css'
import './assets/provide.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
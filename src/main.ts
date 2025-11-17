import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App)

app.use(router)
const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus,{ size: 'small', zIndex: 3000 })
app.config.globalProperties.$http=axios
app.mount('#app')

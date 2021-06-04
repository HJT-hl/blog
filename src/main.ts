import { createApp } from 'vue'
import App from './App'
import router  from './router'
import store from './store'
import "./plugin"
import "element-plus/lib/theme-chalk/base.css"
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')




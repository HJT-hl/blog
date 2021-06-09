import { createApp } from 'vue'
import App from './App'
import router  from './router'
import "./plugin"
import "element-plus/lib/theme-chalk/base.css"
import "highlight.js/styles/atom-one-dark-reasonable.css"
import store from "./store"

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')




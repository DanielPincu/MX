import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import router from './router'

const app = createApp(App)

app.use(router)

// AOS.init();
app.mount('#app')

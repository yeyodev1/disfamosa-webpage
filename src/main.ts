import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/global.scss'
import { captureAttribution, useLeadSession } from '@/composables/useLeadSession'

useLeadSession()
captureAttribution()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

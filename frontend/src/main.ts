import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'

import App from '~/components/App.vue'

import '~/style.css'

const router = createRouter({
	history: createWebHistory(),
})

const app = createApp(App)
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')

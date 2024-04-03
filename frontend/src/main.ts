import { VueQueryPlugin } from '@tanstack/vue-query'
import { createHead } from '@unhead/vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'

import App from '~/components/App.vue'

import '~/style.css'

const head = createHead()

const router = createRouter({
	history: createWebHistory(),
})

const app = createApp(App)
app.use(head)
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')

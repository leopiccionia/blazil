import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import iconify from 'unplugin-icons/vite'
import vueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			'~': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	plugins: [
		iconify({
			autoInstall: true,
			compiler: 'vue3',
		}),
		vueRouter(),
		vue({
			script: {
				propsDestructure: true,
			},
		}),
	],
})

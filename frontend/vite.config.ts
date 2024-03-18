import iconify from 'unplugin-icons/vite'
import vue from '@vitejs/plugin-vue'
import vueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
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

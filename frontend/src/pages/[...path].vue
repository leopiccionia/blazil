<script setup lang="ts">
	import { useRoute } from 'vue-router/auto'

	const route = useRoute('/[...path]')
	const path = route.params.path
</script>

<template>
	<h1>Erro 404</h1>
	<p>Caminho <pre>/{{ path }}</pre> não encontrado.</p>
</template>

<style scoped>
	p {
		margin: 1rem;
	}

	pre {
		background-color: #EEE;
		border-radius: 0.25rem;
		display: inline-block;
		padding: 0.125rem 0.5rem;
	}
</style>

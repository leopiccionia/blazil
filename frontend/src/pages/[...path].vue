<script setup lang="ts">
	import { useRoute } from 'vue-router/auto'

	import { useTitle } from '~/composables/head'

	const route = useRoute('/[...path]')
	const path = route.params.path

	useTitle('Erro 404')
</script>

<template>
	<div class="content">
		<h1>Erro 404</h1>
		<p>O caminho <kbd>/{{ path }}</kbd> não foi encontrado.</p>
	</div>
</template>

<style scoped>
	p {
		margin: 1rem;
	}

	kbd {
		background-color: #EEE;
		border-radius: 0.25rem;
		display: inline-block;
		margin: 0;
		padding: 0.125rem 0.5rem;
	}
</style>

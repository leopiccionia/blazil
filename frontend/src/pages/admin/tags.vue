<script setup lang="ts">
	import CreateTagForm from '~/components/CreateTagForm.vue'
	import TagsRootTree from '~/components/TagsRootTree.vue'
	import { useTagsQuery } from '~/queries/tags'
	import { computeTagsTree } from '~/utils/tags'

	const { data: tree, error, refetch } = useTagsQuery(computeTagsTree)
</script>

<template>
	<h1>Tags</h1>
	<div class="tags-sections" v-if="tree">
		<CreateTagForm :tags="tree"/>
		<section>
			<h2>Lista de tags</h2>
			<TagsRootTree :tags="tree"/>
			<button type="button" @click="refetch()">Recarregar</button>
		</section>
	</div>
	<pre v-if="error">{{ error }}</pre>
</template>

<style scoped>
	h1 {
		margin: 1rem;
	}

	.tags-sections {

		@media screen and (min-width: 769px) {
			display: grid;
			grid-template-columns: 480px 1fr;
		}

		& :deep(h2) {
			margin-top: 0;
		}

		& :deep(section) {
			padding: 1rem;
		}

		& :deep(button) {
			display: block;
			padding: 0.25rem 1rem;
		}
	}
</style>

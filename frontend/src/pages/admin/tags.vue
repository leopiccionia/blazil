<script setup lang="ts">
	import CreateTagForm from '~/components/CreateTagForm.vue'
	import EditTagButton from '~/components/EditTagButton.vue'
	import TagsRootTree from '~/components/TagsRootTree.vue'
	import { useTagsQuery } from '~/queries/tags'
	import { computeTagsTree } from '~/utils/tags'
	import type { Tag } from '~/utils/types'

	const { data: nodes, error, refetch } = useTagsQuery(computeTagsTree)

	function selectTag (tag: Tag) {
		console.log(tag)
	}
</script>

<template>
	<h1>Tags</h1>
	<div class="tags-sections" v-if="nodes">
		<CreateTagForm :nodes="nodes"/>
		<section>
			<h2>Lista de tags</h2>
			<TagsRootTree :action="EditTagButton" :nodes="nodes" @selectTag="selectTag"/>
			<button class="button" type="button" @click="refetch()">Recarregar</button>
		</section>
	</div>
	<pre v-if="error">{{ error }}</pre>
</template>

<style scoped>
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
		}
	}
</style>

<script setup lang="ts">
	import { ref } from 'vue'

	import SelectTag from '~/components/SelectTag.vue'
	import FiltersStatesTree from '~/components/FilterStatesTree.vue'
	import FilterTagsTree from '~/components/FilterTagsTree.vue'
	import type { EntitiesWithTagFilters } from '~/queries/entities'

	const filters = defineModel<EntitiesWithTagFilters>('filters', { required: true })

	const inputTag = ref<number | null>(null)

	function addInputTag () {
		if (inputTag.value) {
			filters.value.tags.add(inputTag.value)
		}
		inputTag.value = null
	}
</script>

<template>
	<div class="filters-bar">
		<h2>Localização</h2>
		<FiltersStatesTree v-model="filters.ufs"/>

		<h2>Tags</h2>
		<SelectTag v-model="inputTag" @update:model-value="addInputTag"/>
		<FilterTagsTree v-model="filters.tags"/>
	</div>
</template>

<style scoped>
	.filters-bar {
		background-color: var(--blue);
		min-width: 15rem;
		padding: 0.1px;

		@media screen and (min-width: 769px) {
			border-radius: 0.25rem;
		}

		& > * {
			margin: 1rem;
		}

		& h2 {
			color: var(--yellow);
		}

		& :deep(.tags-tree) {
			color: white;
			margin: 1rem;
		}

		& :deep(.tags-tree button) {
			line-height: 0;
			margin-inline-end: 0.5ex;
		}

		& :deep(.tags-tree ul) {
			padding-inline-start: calc(1.2em + 0.5ex);
		}

		& :deep(.tags-tree ul.level-1) {
			padding-inline-start: 0.75em;
		}

		& :deep(svg) {
			color: var(--yellow);
		}

		& :deep(svg.arrow-icon) {
			margin-inline-start: 0.5ex;
		}
	}
</style>

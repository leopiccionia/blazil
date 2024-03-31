<script setup lang="ts">
	import { ref } from 'vue'

	import AddTagButtons from '~/components/AddTagButtons.vue'
	import SelectTag from '~/components/SelectTag.vue'
	import StatesTree from '~/components/StatesTree.vue'
	import TagsRootTree from '~/components/TagsRootTree.vue'
	import { provideSelectTag } from '~/composables/injections'
	import type { EntitiesWithTagFilters } from '~/queries/entities'
	import type { Tag } from '~/utils/types'

	const filters = defineModel<EntitiesWithTagFilters>('filters', { required: true })

	const inputTag = ref<number | null>(null)

	function addInputTag () {
		if (inputTag.value && !filters.value.tags.includes(inputTag.value)) {
			filters.value.tags = [...filters.value.tags, inputTag.value].sort(compareNumbers)
		}
		inputTag.value = null
	}

	function compareNumbers (a: number, b: number) {
		return a - b
	}

	function selectTag (tag: Tag) {
		if (!filters.value.tags.includes(tag.id)) {
			filters.value.tags = [...filters.value.tags, tag.id].sort(compareNumbers)
		}
	}

	provideSelectTag(selectTag)
</script>

<template>
	<div class="filters-bar">
		<h2>Localização</h2>
		<StatesTree v-model="filters.ufs"/>

		<h2>Tags</h2>
		<SelectTag v-model="inputTag" @update:model-value="addInputTag"/>
		<TagsRootTree :action="AddTagButtons"/>
	</div>
</template>

<style scoped>
	.filters-bar {
		background-color: var(--blue);
		border-radius: 0.25rem;
		min-width: 15rem;
		padding: 0.1px;

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

		& :deep(.tags-tree svg) {
			color: var(--yellow);
		}
	}
</style>

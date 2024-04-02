<script setup lang="ts">
	import { ref } from 'vue'

	import AddIcon from '~icons/ph/plus-circle-bold'
	import MaximizeIcon from '~icons/ph/caret-down-bold'
	import MinimizeIcon from '~icons/ph/caret-up-bold'

	import SelectTag from '~/components/SelectTag.vue'
	import StatesTree from '~/components/StatesTree.vue'
	import TagsRootTree from '~/components/TagsRootTree.vue'
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
</script>

<template>
	<div class="filters-bar">
		<h2>Localização</h2>
		<StatesTree v-model="filters.ufs"/>

		<h2>Tags</h2>
		<SelectTag v-model="inputTag" @update:model-value="addInputTag"/>
		<TagsRootTree v-slot="{ tag, hasChildren, showChildren, toggleChildren }">
			<button class="add-button" type="button" :title="`Filtrar por &quot;${tag.name}&quot;`" @click="selectTag(tag)" v-if="tag.parent_id || !hasChildren">
				<AddIcon/>
			</button>
			<label>
				<input type="checkbox" :value="showChildren" @change="toggleChildren" v-if="hasChildren">
				<span>{{ tag.name }}</span>
				<component class="arrow-icon" :is="showChildren ? MinimizeIcon : MaximizeIcon" v-if="hasChildren"/>
			</label>
		</TagsRootTree>
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

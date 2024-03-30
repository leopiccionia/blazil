<script setup lang="ts">
	import { onClickOutside } from '@vueuse/core'
	import { computed, ref, watch } from 'vue'

	import { useTagsQuery } from '~/queries/tags'
	import { computeTagsList, computeTagsMap } from '~/utils/tags'
	import type { Tag } from '~/utils/types'

	const model = defineModel<number | null>({ default: null })

	const { data: tagsList } = useTagsQuery(computeTagsList)
	const { data: tagsMap } = useTagsQuery(computeTagsMap)

	const arrowIndex = ref(-1)
	const isOpen = ref(false)
	const search = ref('')

	const wrapper = ref<HTMLElement>()

	const filteredNodes = computed(() => {
		if (!search.value) {
			return tagsList.value ?? []
		}
		const term = search.value.toLocaleLowerCase()
		return tagsList.value?.filter((tag) => tag.name.toLocaleLowerCase().includes(term)) ?? []
	})

	watch(model, (newValue) => {
		if (newValue) {
			search.value = tagsMap.value?.[newValue]?.name ?? ''
		} else {
			search.value = ''
		}
	})

	onClickOutside(wrapper, () => {
		arrowIndex.value = -1
		isOpen.value = false
	})

	function moveDown () {
		if (arrowIndex.value <= (tagsList.value?.length ?? 0)) {
			arrowIndex.value += 1
		}
	}

	function moveUp () {
		if (arrowIndex.value > 0) {
			arrowIndex.value -= 1
		}
	}

	function openDropdown () {
		isOpen.value = true
	}

	function selectOption () {
		if (arrowIndex.value >= 1) {
			setOption(tagsList.value?.[arrowIndex.value - 1] ?? null)
		} else {
			setOption(null)
		}
	}

	function setOption (tag: Tag | null) {
		if (tag) {
			model.value = tag.id
			search.value = tag.name
		} else {
			model.value = null
			search.value = ''
		}
		arrowIndex.value = -1
		isOpen.value = false
	}
</script>

<template>
	<div class="autocomplete" ref="wrapper">
		<input class="form-field" type="text" aria-label="Pesquisar tag" v-model="search" @input="openDropdown" @keydown.down="moveDown" @keydown.enter="selectOption" @keydown.up="moveUp">
		<ul v-show="isOpen">
			<li :key="0" :class="{ active: arrowIndex === 0 }" @click="setOption(null)">--- Nenhum ---</li>
			<li v-for="(node, index) of filteredNodes" :key="node.id" :class="{ active: arrowIndex === index + 1 }" @click="setOption(node)">
				{{ node.name }}<span v-if="node.parent_id"> ({{ tagsMap![node.parent_id]?.name }})</span>
			</li>
		</ul>
	</div>
</template>

<style scoped>
	.autocomplete {
		position: relative;

		& ul {
			background-color: white;
			border: 1px solid #CCC;
			border-radius: 0.25rem;
			margin: 0;
			max-height: 30vh;
			min-height: 1em;
			overflow: auto;
			padding: 0;
			position: absolute;
			width: 100%;
			z-index: 1;
		}

		& li {
			cursor: pointer;
			font-size: 0.875rem;
			list-style: none;
			padding: 0.125rem 0.5rem;
			text-align: start;

			& span {
				color: var(--green);
			}

			&.active, &:hover {
				background-color: #F7F7F7;
			}
		}
	}
</style>

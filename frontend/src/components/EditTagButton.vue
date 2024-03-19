<script setup lang="ts">
	import { inject } from 'vue'
	import type { PropType } from 'vue'

	import EditIcon from '~icons/ph/note-pencil-light'
	import RemoveIcon from '~icons/ph/trash-light'

	import { InjectSelectTag } from '~/utils/injections'
	import type { TagNode } from '~/utils/types'

	const { node } = defineProps({
		node: { type: Object as PropType<TagNode>, required: true },
	})

	const injectedSelectTag = inject(InjectSelectTag)!

	function deleteTag () {
		if (window.confirm(`Deseja mesmo remover a tag "${node.tag.name}"?`)) {
			// TODO
		}
	}

	function selectTag () {
		injectedSelectTag(node)
	}
</script>

<template>
	<button type="button" @click="selectTag" :title="`Editar &quot;${node.tag.name}&quot;`">
		<EditIcon/>
	</button>
	<button type="button" @click="deleteTag" :title="`Remover &quot;${node.tag.name}&quot;`" v-if="!node.children">
		<RemoveIcon/>
	</button>
</template>

<style scoped>
	button {
		background-color: transparent;
		border: none;
		color: #888;
		margin-inline-start: 0.5ex;
		padding: 0;
	}
</style>

<script setup lang="ts">
	import { inject } from 'vue'
	import type { PropType } from 'vue'

	import EditIcon from '~icons/ph/note-pencil-light'
	import RemoveIcon from '~icons/ph/trash-light'

	import TagDeleteModal from '~/components/TagDeleteModal.vue'
	import { useModal } from '~/composables/modal'
	import { InjectSelectTag } from '~/utils/injections'
	import type { TagNode } from '~/utils/types'

	const { node } = defineProps({
		node: { type: Object as PropType<TagNode>, required: true },
	})

	const deleteTagModal = useModal({ defaultValue: false })

	const injectedSelectTag = inject(InjectSelectTag)!

	async function deleteTag () {
		const confirmDeletion = await deleteTagModal.open()
		console.log(confirmDeletion)
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
	<TagDeleteModal :controller="deleteTagModal" :node="node"/>
</template>

<style scoped>
	button {
		color: #888;
		margin-inline-start: 0.5ex;
	}
</style>

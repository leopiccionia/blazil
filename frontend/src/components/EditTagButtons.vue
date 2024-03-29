<script setup lang="ts">
	import type { PropType } from 'vue'

	import EditIcon from '~icons/ph/note-pencil'
	import RemoveIcon from '~icons/ph/trash'

	import DeleteTagModal from '~/components/DeleteTagModal.vue'
	import EditTagModal from '~/components/EditTagModal.vue'
	import { useModal } from '~/composables/modal'
	import type { TagNode } from '~/utils/types'

	const { node } = defineProps({
		node: { type: Object as PropType<TagNode>, required: true },
	})

	const deleteTagModal = useModal({ defaultValue: false })
	const editTagModal = useModal({ defaultValue: null })

	async function deleteTag () {
		const confirmDeletion = await deleteTagModal.open()
		console.log(confirmDeletion)
	}
</script>

<template>
	<button class="edit-button" type="button" :title="`Editar &quot;${node.tag.name}&quot;`" @click="editTagModal.open">
		<EditIcon/>
	</button>
	<button class="delete-button" type="button" :title="`Remover &quot;${node.tag.name}&quot;`" @click="deleteTag" v-if="!node.children">
		<RemoveIcon/>
	</button>
	<DeleteTagModal :controller="deleteTagModal" :node="node"/>
	<EditTagModal :controller="editTagModal" :tag="node.tag"/>
</template>

<style scoped>
	button {
		color: #888;
		line-height: 0;
		margin-inline-start: 0.5ex;
	}

	.delete-button {
		color: #F77;
	}
</style>

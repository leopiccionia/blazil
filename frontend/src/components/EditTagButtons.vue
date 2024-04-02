<script setup lang="ts">
	import type { PropType } from 'vue'

	import EditIcon from '~icons/ph/note-pencil'
	import RemoveIcon from '~icons/ph/trash'

	import DeleteTagModal from '~/components/DeleteTagModal.vue'
	import EditTagModal from '~/components/EditTagModal.vue'
	import { useModal } from '~/composables/modal'
	import { useTagDelete } from '~/mutations/tags'
	import type { Tag } from '~/utils/types'

	const { hasChildren, tag } = defineProps({
		hasChildren: { type: Boolean, required: true },
		tag: { type: Object as PropType<Tag>, required: true },
	})

	const { mutateAsync: deleteAsync } = useTagDelete()

	const deleteTagModal = useModal({ defaultValue: false })
	const editTagModal = useModal({ defaultValue: null })

	async function deleteTag () {
		const confirmDeletion = await deleteTagModal.open()
		if (confirmDeletion) {
			await deleteAsync(tag)
		}
	}
</script>

<template>
	<button class="edit-button" type="button" :title="`Editar &quot;${tag.name}&quot;`" @click="editTagModal.open">
		<EditIcon/>
	</button>
	<button class="delete-button" type="button" :title="`Excluir &quot;${tag.name}&quot;`" @click="deleteTag" v-if="!hasChildren">
		<RemoveIcon/>
	</button>
	<DeleteTagModal :controller="deleteTagModal" :tag="tag"/>
	<EditTagModal :controller="editTagModal" :tag="tag"/>
</template>

<style scoped>
	button {
		color: #888;
		line-height: 0;
		margin-inline-start: 0.5ex;
	}

	.delete-button {
		color: var(--red);
	}
</style>

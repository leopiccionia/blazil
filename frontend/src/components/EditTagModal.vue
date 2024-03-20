<script setup lang="ts">
	import { reactive, toRaw, watch } from 'vue'
	import type { PropType } from 'vue'

	import Modal from '~/components/Modal.vue'
	import SelectTag from '~/components/SelectTag.vue'
	import type { ModalController } from '~/composables/modal'
	import { useTagUpdate } from '~/mutations/tags'
	import { useTagsQuery } from '~/queries/tags'
	import { computeTagsTree } from '~/utils/tags'
	import type { Tag } from '~/utils/types'

	const { controller, tag } = defineProps({
		controller: { type: Object as PropType<ModalController<null>>, required: true },
		tag: { type: Object as PropType<Tag>, required: true },
	})

	const { data: nodes } = useTagsQuery(computeTagsTree)
	const { mutateAsync, error } = useTagUpdate()

	const updatedTag = reactive<Tag>({
		id: 0,
		name: '',
		parent_id: null,
	})

	watch(controller.isOpen, () => {
		updatedTag.id = tag.id
		updatedTag.name = tag.name
		updatedTag.parent_id = tag.parent_id
	})

	async function updateTag () {
		if (updatedTag.name) {
			await mutateAsync(toRaw(updatedTag))
			controller.close()
		}
	}
</script>

<template>
	<Modal title="Editar tag" :controller="controller">
		<form @submit.prevent="updateTag">
			<label class="form-label">
				<span>Nome</span>
				<input class="form-field" type="text" required v-model="updatedTag.name">
			</label>
			<label class="form-label">
				<span>Pai</span>
				<SelectTag v-model="updatedTag.parent_id" :nodes="nodes" v-if="controller.isOpen && nodes"/>
			</label>
			<div class="buttons">
				<button class="button" type="button" @click="controller.close()">Cancelar</button>
				<button class="button" type="submit">Atualizar</button>
			</div>
		</form>
		<pre v-if="error">{{ error }}</pre>
	</Modal>
</template>

<style scoped>
	form {

		& input, select {
			width: 100%;
		}
	}
</style>

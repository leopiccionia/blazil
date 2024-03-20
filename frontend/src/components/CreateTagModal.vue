<script setup lang="ts">
	import { reactive, toRaw, watch } from 'vue'
	import type { PropType } from 'vue'

	import Modal from '~/components/Modal.vue'
	import SelectTag from '~/components/SelectTag.vue'
	import type { ModalController } from '~/composables/modal'
	import { useTagCreate } from '~/mutations/tags'
	import type { TagNode } from '~/utils/types'

	const { controller, nodes } = defineProps({
		controller: { type: Object as PropType<ModalController<null>>, required: true },
		nodes: { type: Array as PropType<TagNode[]>, required: true },
	})

	const { mutateAsync, error } = useTagCreate()

	const newTag = reactive({
		name: '',
		parent_id: null,
	})

	watch(controller.isOpen, () => {
		newTag.name = ''
		newTag.parent_id = null
	})

	async function createTag () {
		if (newTag.name) {
			await mutateAsync(toRaw(newTag))
			controller.close()
		}
	}
</script>

<template>
	<Modal title="Criar nova tag" :controller="controller">
		<form @submit.prevent="createTag">
			<label class="form-label">
				<span>Nome</span>
				<input class="form-field" type="text" required v-model="newTag.name">
			</label>
			<label class="form-label">
				<span>Pai</span>
				<SelectTag v-model="newTag.parent_id" :nodes="nodes" v-if="controller.isOpen"/>
			</label>
			<div class="buttons">
				<button class="button" type="button" @click="controller.close()">Cancelar</button>
				<button class="button" type="submit">Criar</button>
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

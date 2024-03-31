<script setup lang="ts">
	import { reactive, toRaw, watch } from 'vue'
	import type { PropType } from 'vue'

	import Modal from '~/components/Modal.vue'
	import SelectTag from '~/components/SelectTag.vue'
	import type { ModalController } from '~/composables/modal'
	import { useTagCreate } from '~/mutations/tags'
	import type { Tag } from '~/utils/types'

	const { controller } = defineProps({
		controller: { type: Object as PropType<ModalController<Tag | undefined>>, required: true },
	})

	const { mutateAsync, error } = useTagCreate()

	const formTag = reactive({
		name: '',
		parent_id: null,
	})

	watch(controller.isOpen, () => {
		formTag.name = ''
		formTag.parent_id = null
	})

	async function createTag () {
		if (formTag.name) {
			const [newTag] = await mutateAsync(toRaw(formTag))
			controller.close(newTag)
		}
	}
</script>

<template>
	<Modal title="Criar tag" :controller="controller">
		<form @submit.prevent="createTag">
			<label class="form-label">
				<span>Nome</span>
				<input class="form-field" type="text" required v-model="formTag.name">
			</label>
			<label class="form-label">
				<span>Pai</span>
				<SelectTag v-model="formTag.parent_id" v-if="controller.isOpen"/>
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

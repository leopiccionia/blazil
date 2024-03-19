<script setup lang="ts">
	import type { PropType } from 'vue'

	import Modal from '~/components/Modal.vue'
	import type { ModalController } from '~/composables/modal'
	import { TagNode } from '~/utils/types'

	const { controller, node } = defineProps({
		controller: { type: Object as PropType<ModalController<boolean>>, required: true },
		node: { type: Object as PropType<TagNode>, required: true },
	})
</script>

<template>
	<Modal title="Remover tag" :controller="controller">
		<p>Deseja mesmo remover a tag "{{ node.tag.name }}"?</p>
		<div class="buttons">
			<button class="button" @click="controller.close(false)">Cancelar</button>
			<button class="button" @click="controller.close(true)">Confirmar</button>
		</div>
	</Modal>
</template>

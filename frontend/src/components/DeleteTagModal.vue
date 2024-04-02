<script setup lang="ts">
	import type { PropType } from 'vue'

	import Modal from '~/components/Modal.vue'
	import type { ModalController } from '~/composables/modal'
	import { useEntityTagsQuery } from '~/queries/entity-tags'
	import { Tag } from '~/utils/types'

	const { controller, tag } = defineProps({
		controller: { type: Object as PropType<ModalController<boolean>>, required: true },
		tag: { type: Object as PropType<Tag>, required: true },
	})

	const { data: entityTags } = useEntityTagsQuery({ tag_id: tag.id }, () => controller.isOpen.value)
</script>

<template>
	<Modal title="Excluir tag" :controller="controller">
		<p>Deseja mesmo excluir a tag "{{ tag.name }}"?</p>
		<template v-if="entityTags">
			<p v-if="entityTags.length === 0">Ela não está associada a nenhuma entidade.</p>
			<p class="text-danger" v-else-if="entityTags.length === 1">Ela está associada a um entidade.</p>
			<p class="text-danger" v-else>Ela está associada a {{ entityTags.length }} entidades.</p>
		</template>
		<div class="buttons">
			<button class="button" @click="controller.close(false)">Cancelar</button>
			<button class="button" @click="controller.close(true)">Confirmar</button>
		</div>
	</Modal>
</template>

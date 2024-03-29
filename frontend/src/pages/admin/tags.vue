<script setup lang="ts">
	import CreateTagModal from '~/components/CreateTagModal.vue'
	import EditTagButtons from '~/components/EditTagButtons.vue'
	import TagsRootTree from '~/components/TagsRootTree.vue'
	import { useModal } from '~/composables/modal'
	import type { Tag } from '~/utils/types'

	const createTagModal = useModal<Tag | undefined>({ defaultValue: undefined })
</script>

<template>
	<h1>Tags</h1>
	<section>
		<TagsRootTree :action="EditTagButtons"/>
		<button class="button" @click="createTagModal.open">Criar tag</button>
	</section>
	<CreateTagModal :controller="createTagModal"/>
</template>

<style scoped>
	section {
		margin: 1rem;
	}

	& :deep(.button) {
		display: block;
	}
</style>

<script setup lang="ts">
	import ReloadIcon from '~icons/ph/arrows-clockwise'

	import CreateTagModal from '~/components/CreateTagModal.vue'
	import EditTagButtons from '~/components/EditTagButtons.vue'
	import TagsRootTree from '~/components/TagsRootTree.vue'
	import { useModal } from '~/composables/modal'
	import { useTagsQuery } from '~/queries/tags'
	import { computeTagsTree } from '~/utils/tags'
	import type { Tag } from '~/utils/types'

	const { data: nodes, error, refetch } = useTagsQuery(computeTagsTree)

	const createTagModal = useModal<Tag | undefined>({ defaultValue: undefined })
</script>

<template>
	<h1>Tags</h1>
	<button class="refetch" @click="refetch()"><ReloadIcon/> Recarregar</button>
	<template v-if="nodes">
		<section>
			<TagsRootTree :action="EditTagButtons" :nodes="nodes"/>
			<button class="button" @click="createTagModal.open">Criar tag</button>
		</section>
		<CreateTagModal :controller="createTagModal" :nodes="nodes"/>
	</template>
	<pre v-if="error">{{ error }}</pre>
</template>

<style scoped>
	section {
		margin: 1rem;
	}

	.refetch {
		align-items: center;
		color: #888;
		display: flex;
		gap: 0.5ex;
		margin: 1rem;
	}

	& :deep(.button) {
		display: block;
	}
</style>

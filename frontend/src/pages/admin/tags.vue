<script setup lang="ts">
	import LeafIcon from '~icons/ph/asterisk-bold'
	import MaximizeIcon from '~icons/ph/caret-down-bold'
	import MinimizeIcon from '~icons/ph/caret-up-bold'

	import CreateTagModal from '~/components/CreateTagModal.vue'
	import EditTagButtons from '~/components/EditTagButtons.vue'
	import TagsRootTree from '~/components/TagsRootTree.vue'
	import { useModal } from '~/composables/modal'
	import type { Tag } from '~/utils/types'

	const createTagModal = useModal<Tag | undefined>({ defaultValue: undefined })
</script>

<template>
	<div class="content">
		<h1>Tags</h1>
		<section>
			<TagsRootTree v-slot="{ tag, hasChildren, showChildren, toggleChildren }">
				<label>
					<input type="checkbox" :value="showChildren" @change="toggleChildren" v-if="hasChildren">
					<component class="arrow-icon" :is="hasChildren ? (showChildren ? MinimizeIcon : MaximizeIcon) : LeafIcon"/>
					<span>{{ tag.name }}</span>
				</label>
				<EditTagButtons :tag="tag" :hasChildren="hasChildren"/>
			</TagsRootTree>
			<button class="button" @click="createTagModal.open">Criar tag</button>
		</section>
	</div>
	<CreateTagModal :controller="createTagModal"/>
</template>

<style scoped>
	section {
		margin: 1rem;
	}

	:deep(.tags-tree ul) {
		padding-inline-start: calc(1.2em + 0.5ex);
	}
</style>

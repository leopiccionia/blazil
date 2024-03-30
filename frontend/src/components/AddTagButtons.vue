<script setup lang="ts">
	import type { PropType } from 'vue'

	import AddButton from '~icons/ph/plus-circle-bold'

	import { useSelectTag } from '~/composables/injections'
	import type { TagNode } from '~/utils/types'

	const { node } = defineProps({
		node: { type: Object as PropType<TagNode>, required: true },
	})

	const selectTag = useSelectTag()
</script>

<template>
	<template v-if="node.tag.parent_id">
		<button class="add-button" type="button" :title="`Filtrar por &quot;${node.tag.name}&quot;`" @click="selectTag(node.tag)">
			<AddButton/>
		</button>
	</template>
</template>

<style scoped>
	button {
		color: #888;
		line-height: 0;
		margin-inline-start: 0.5ex;
	}
</style>

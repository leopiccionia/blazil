<script setup lang="ts">
	import type { PropType } from 'vue'

	import type { TagNode } from '~/utils/types'

	const { nodes } = defineProps({
		nodes: { type: Array as PropType<TagNode[]>, required: true },
		prefix: { type: String, default: '' },
	})
</script>

<template>
	<template v-for="node of nodes" :key="node.id">
		<option :value="node.tag.id">{{ prefix }}{{ node.tag.name }}</option>
		<SelectTagOptions :nodes="node.children" :prefix="`${prefix}${ node.tag.name} › `" v-if="node.children"/>
	</template>
</template>

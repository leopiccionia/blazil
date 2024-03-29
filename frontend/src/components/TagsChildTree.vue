<script setup lang="ts">
	import { ref } from 'vue'
	import type { Component, PropType } from 'vue'

	import LeafIcon from '~icons/ph/dot-bold'
	import MaximizeIcon from '~icons/ph/caret-down-bold'
	import MinimizeIcon from '~icons/ph/caret-up-bold'

	import type { TagNode } from '~/utils/types'

	const { action, node } = defineProps({
		action: { type: Object as PropType<Component<{ node: TagNode }>>, default: null },
		node: { type: Object as PropType<TagNode>, required: true },
	})

	const showTags = ref(false)
</script>

<template>
	<li>
		<label>
			<component :is="node.children ? (showTags ? MinimizeIcon : MaximizeIcon) : LeafIcon"/>
			<input type="checkbox" v-model="showTags" v-if="node.children">
			<span>{{ node.tag.name }}</span>
			<component :is="action" :node="node" v-if="action"/>
		</label>
		<ul v-if="showTags && node.children">
			<TagsChildTree v-for="child of node.children" :key="child.tag.id" :action="action" :node="child"/>
		</ul>
	</li>
</template>

<style scoped>
	label {
		align-items: center;
		display: flex;

		& span {
			user-select: none;
		}
	}

	svg {
		color: #AAA;
		margin-inline-end: 0.5ex;
	}
</style>

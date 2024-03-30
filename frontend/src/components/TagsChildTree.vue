<script setup lang="ts">
	import { ref } from 'vue'
	import type { Component, PropType } from 'vue'

	import MaximizeIcon from '~icons/ph/caret-down-bold'
	import MinimizeIcon from '~icons/ph/caret-up-bold'

	import type { TagNode } from '~/utils/types'

	const { action, node } = defineProps({
		action: { type: Object as PropType<Component<{ node: TagNode }>>, default: null },
		level: { type: Number, default: 1 },
		node: { type: Object as PropType<TagNode>, required: true },
	})

	const showTags = ref(false)
</script>

<template>
	<li>
		<div class="tree-row">
			<component :is="action" :node="node" v-if="action"/>
			<label>
				<input type="checkbox" v-model="showTags" v-if="node.children">
				<span>{{ node.tag.name }}</span>
				<component class="arrow-icon" v-if="node.children" :is="showTags ? MinimizeIcon : MaximizeIcon"/>
			</label>
		</div>
		<ul :class="`level-${level}`" v-if="showTags && node.children">
			<TagsChildTree v-for="child of node.children" :key="child.tag.id" :action="action" :level="level + 1" :node="child"/>
		</ul>
	</li>
</template>

<style scoped>
	.tree-row {
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

	svg.arrow-icon {
		margin-inline-start: 0.5ex;
		margin-inline-end: 0;
	}
</style>

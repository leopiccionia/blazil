<script setup lang="ts">
	import type { Component, PropType } from 'vue'

	import TagsChildTree from '~/components/TagsChildTree.vue'
	import type { TagNode } from '~/utils/types'

	const { action, nodes } = defineProps({
		action: { type: Object as PropType<Component<{ node: TagNode }>>, default: null },
		nodes: { type: Array as PropType<TagNode[]>, required: true },
	})
</script>

<template>
	<ul class="tags-tree">
		<TagsChildTree v-for="node of nodes" :key="node.tag.id" :action="action" :node="node"/>
	</ul>
</template>

<style>
.tags-tree {
	padding: 0;

	& ul {
		padding-inline-start: 1.2em;
	}

	& li {
		list-style: none;
	}

	& input[type="checkbox"] {
		height: 0;
		margin: 0;
		padding: 0;
		width: 0;

		&:focus {

			& + span {
				outline: -webkit-focus-ring-color auto 5px;
			}
		}
	}
}
</style>

<script setup lang="ts">
	import { provide } from 'vue'
	import type { Component, PropType } from 'vue'

	import TagsChildTree from '~/components/TagsChildTree.vue'
	import { InjectSelectTag } from '~/utils/injections'
	import type { Tag, TagNode } from '~/utils/types'

	const { action, nodes } = defineProps({
		action: { type: Object as PropType<Component<{ tag: TagNode }>>, default: null },
		nodes: { type: Array as PropType<TagNode[]>, required: true },
	})

	const emit = defineEmits<{
		selectTag: [tag: Tag],
	}>()

	function selectTag (node: TagNode) {
		emit('selectTag', node.tag)
	}

	provide(InjectSelectTag, selectTag)
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
		display: none;
	}
}
</style>

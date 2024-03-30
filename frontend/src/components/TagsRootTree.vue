<script setup lang="ts">
	import type { Component, PropType } from 'vue'

	import TagsChildTree from '~/components/TagsChildTree.vue'
	import { useTagsQuery } from '~/queries/tags'
	import { computeTagsTree } from '~/utils/tags'
	import type { TagNode } from '~/utils/types'

	const { action } = defineProps({
		action: { type: Object as PropType<Component<{ node: TagNode }>>, default: null },
	})

	const { data: nodes, error } = useTagsQuery(computeTagsTree)
</script>

<template>
	<ul class="tags-tree" v-if="nodes">
		<TagsChildTree v-for="node of nodes" :key="node.tag.id" :action="action" :node="node"/>
	</ul>
	<pre v-if="error">{{ error }}</pre>
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

	& label {
		align-items: center;
		display: flex;

		& span {
			user-select: none;
		}

		& > svg {
			color: #AAA;
			margin-inline-end: 0.5ex;
		}
	}
}
</style>

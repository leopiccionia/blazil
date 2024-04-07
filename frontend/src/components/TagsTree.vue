<script setup lang="ts">
	import TagsChildTree from '~/components/TagsChildTree.vue'
	import { useTagsQuery } from '~/queries/tags'
	import { computeTagsTree } from '~/utils/tags'
	import type { TagTreeLineSlot } from '~/utils/types'

	const slots = defineSlots<{
		default: (props: TagTreeLineSlot) => void,
	}>()

	const { data: nodes, error } = useTagsQuery(computeTagsTree)
</script>

<template>
	<ul class="tags-tree" v-if="nodes">
		<TagsChildTree v-for="node of nodes" :key="node.tag.id" :node="node">
			<template #default="{ tag, hasChildren, showChildren, toggleChildren }">
				<slot :tag="tag" :hasChildren="hasChildren" :showChildren="showChildren" :toggleChildren="toggleChildren"/>
			</template>
		</TagsChildTree>
	</ul>
	<pre v-if="error">{{ error }}</pre>
</template>

<style>
.tags-tree {
	padding: 0;

	& ul {
		padding: 0;
	}

	& li {
		list-style: none;
	}

	& input[type="checkbox"] {

		&:focus {

			& ~ svg {
				outline: Highlight auto 5px;
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

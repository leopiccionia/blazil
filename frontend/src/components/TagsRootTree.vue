<script setup lang="ts">
	import type { PropType } from 'vue'

	import TagsChildTree from '~/components/TagsChildTree.vue'
	import type { TagTree } from '~/utils/types'

	const { tags } = defineProps({
		tags: { type: Array as PropType<TagTree[]>, required: true },
	})
</script>

<template>
	<ul class="tags-tree">
		<TagsChildTree v-for="tag of tags" :key="tag.id" :tag="tag"/>
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

<script setup lang="ts">
	import { ref } from 'vue'
	import type { PropType } from 'vue'

	import LeafIcon from '~icons/ph/minus'
	import MaximizeIcon from '~icons/ph/caret-down'
	import MinimizeIcon from '~icons/ph/caret-up'

	import type { TagTree } from '../utils/types'

	const { tag } = defineProps({
		tag: { type: Object as PropType<TagTree>, required: true },
	})

	const showTags = ref(false)
</script>

<template>
	<li class="tag-tree">
		<label>
			<component :is="tag.children ? (showTags ? MinimizeIcon : MaximizeIcon) : LeafIcon"/>
			<input type="checkbox" v-model="showTags" v-if="tag.children">
			<span>{{ tag.name }}</span>
		</label>
		<ul v-if="showTags">
			<TagsChildTree v-for="child of tag.children" :key="child.id" :tag="child"/>
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
		color: #888;
		margin-inline-end: 0.5ex;
	}
</style>

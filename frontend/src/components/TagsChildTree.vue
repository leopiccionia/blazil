<script setup lang="ts">
	import { ref } from 'vue'
	import type { PropType } from 'vue'

	import LeafIcon from '~icons/fa6-solid/angle-right'
	import MaximizeIcon from '~icons/fa6-solid/square-plus'
	import MinimizeIcon from '~icons/fa6-solid/square-minus'

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
		color: #999;
		margin-right: 1ex;
	}
</style>

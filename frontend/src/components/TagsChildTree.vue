<script setup lang="ts">
	import { ref } from 'vue'
	import type { PropType } from 'vue'

	import type { TagNode, TagTreeLineSlot } from '~/utils/types'

	const { node } = defineProps({
		level: { type: Number, default: 1 },
		node: { type: Object as PropType<TagNode>, required: true },
	})

	const slots = defineSlots<{
		default: (props: TagTreeLineSlot) => void,
	}>()

	const showChildren = ref(false)

	function toggleChildren () {
		showChildren.value = !showChildren.value
	}
</script>

<template>
	<li>
		<div class="tree-row">
			<slot :tag="node.tag" :hasChildren="Boolean(node.children)" :showChildren="showChildren" :toggleChildren="toggleChildren"/>
		</div>
		<ul :class="`level-${level}`" v-if="node.children && showChildren">
			<TagsChildTree v-for="child of node.children" :key="child.tag.id" :level="level + 1" :node="child">
				<template #default="{ tag, hasChildren, showChildren, toggleChildren }">
					<slot :tag="tag" :hasChildren="hasChildren" :showChildren="showChildren" :toggleChildren="toggleChildren"/>
				</template>
			</TagsChildTree>
		</ul>
	</li>
</template>

<style scoped>
	.tree-row {
		align-items: center;
		display: flex;

		& :slotted(span) {
			user-select: none;
		}
	}
</style>

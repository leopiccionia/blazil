<script setup lang="ts">
	import type { PropType } from 'vue'

	import type { TagTree } from '~/utils/types'

	const { tags } = defineProps({
		prefix: { type: String, default: '' },
		tags: { type: Array as PropType<TagTree[]>, required: true },
	})
</script>

<template>
	<template v-for="tag of tags" :key="tag.id">
		<option :value="tag.id">{{ prefix }}{{ tag.name }}</option>
		<SelectTagOptions :prefix="`${prefix}${tag.name} › `" :tags="tag.children" v-if="tag.children"/>
	</template>
</template>

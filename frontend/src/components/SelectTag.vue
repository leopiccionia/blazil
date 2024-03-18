<script setup lang="ts">
	import type { PropType } from 'vue'

	import SelectTagOptions from './SelectTagOptions.vue'
	import type { TagTree } from '../utils/types'

	const model = defineModel()

	const { tags } = defineProps({
		tags: { type: Array as PropType<TagTree[]>, required: true },
	})
</script>

<template>
	<select v-model="model">
		<option :value="null" :key="0">-- Nenhum --</option>
		<SelectTagOptions :tags="tags"/>
	</select>
</template>

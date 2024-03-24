<script setup lang="ts">
	import type { PropType } from 'vue'

	import SelectTagOptions from '~/components/SelectTagOptions.vue'
	import type { TagNode } from '~/utils/types'

	const model = defineModel()

	const { nodes } = defineProps({
		nodes: { type: Array as PropType<TagNode[]>, required: true },
	})
</script>

<template>
	<select class="form-field" v-model="model">
		<option :value="null" :key="0">--- Nenhum ---</option>
		<SelectTagOptions :nodes="nodes"/>
	</select>
</template>

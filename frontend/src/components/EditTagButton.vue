<script setup lang="ts">
	import { inject } from 'vue'
	import type { PropType } from 'vue'

	import EditIcon from '~icons/ph/note-pencil-light'

	import { InjectSelectTag } from '~/utils/injections'
	import type { TagNode } from '~/utils/types'

	const { tag } = defineProps({
		tag: { type: Object as PropType<TagNode>, required: true },
	})

	const injectedSelectTag = inject(InjectSelectTag)!

	function selectTag () {
		injectedSelectTag(tag)
	}
</script>

<template>
	<button type="button" @click="selectTag">
		<EditIcon/>
	</button>
</template>

<style scoped>
	button {
		background-color: transparent;
		border: none;
		padding: 0;
	}

	svg {
		color: #888;
		margin-inline-start: 0.5ex;
	}
</style>

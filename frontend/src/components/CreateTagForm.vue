<script setup lang="ts">
	import { reactive, toRaw } from 'vue'
	import type { PropType } from 'vue'

	import SelectTag from '~/components/SelectTag.vue'
	import { useTagCreate } from '~/mutations/tags'
	import type { TagTree } from '~/utils/types'

	const { tags } = defineProps({
		tags: { type: Array as PropType<TagTree[]>, required: true },
	})

	const { mutateAsync, error } = useTagCreate()

	const newTag = reactive({
		name: '',
		parent_id: null,
	})

	async function createTag () {
		if (newTag.name) {
			await mutateAsync(toRaw(newTag))
			newTag.name = ''
			newTag.parent_id = null
		}
	}
</script>

<template>
	<section>
		<h2>Criar nova tag</h2>
		<form @submit.prevent="createTag">
			<label>
				<span>Nome</span>
				<input type="text" required v-model="newTag.name">
			</label>
			<label>
				<span>Pai</span>
				<SelectTag v-model="newTag.parent_id" :tags="tags"/>
			</label>
			<button type="submit">Criar</button>
		</form>
		<pre v-if="error">{{ error }}</pre>
	</section>
</template>

<style scoped>
	section {
		background-color: #F7F7F7;
	}

	form {

		& label {
			display: block;
			margin: 1rem 0;

			& > span {
				display: block;
				font-weight: bold;
			}
		}

		& input, select {
			padding: 0.25rem 1rem;
			width: 100%;
		}

		& button {
			margin-inline-start: auto;
		}
	}
</style>

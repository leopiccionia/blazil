<script setup lang="ts">
	import { shallowRef } from 'vue'
	import type { PropType } from 'vue'

	import { useEntityUpdate } from '~/mutations/entities'
	import { useFileUpload } from '~/mutations/storage'
	import { fileSize, getPublicUrl } from '~/utils/storage'
	import type { Entity } from '~/utils/types'

	const { entity } = defineProps({
		entity: { type: Object as PropType<Entity>, required: true },
	})

	const { mutateAsync, error } = useEntityUpdate()
	const { mutateAsync: uploadAsync, error: uploadError } = useFileUpload()

	const lastFile = shallowRef<File | null>(null)

	async function uploadFile (event: Event) {
		const file = (event.target! as HTMLInputElement).files![0]

		if (file) {
			const extension = file.name.split('.').at(-1) ?? '.jpg'
			lastFile.value = file

			const { path } = await uploadAsync({ name: `entities/${entity.id}.${extension}`, file })
			const publicUrl = getPublicUrl(path)

			await mutateAsync({ id: entity.id, image: publicUrl })
		}

		lastFile.value = null
	}
</script>

<template>
	<label class="file-uploader button">
		<span v-if="lastFile">{{ lastFile.name }} ({{ fileSize(lastFile) }})</span>
		<span v-else>Enviar imagem</span>
		<input type="file" accept="image/*" @change="uploadFile">
	</label>
	<pre v-if="error">{{ error }}</pre>
	<pre v-if="uploadError">{{ uploadError }}</pre>
</template>

<style scoped>
	.file-uploader {
		margin-top: 2rem;
	}

	input[type="file"] {
		display: none;
	}
</style>

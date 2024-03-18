<script setup lang="ts">
	import type { PropType } from 'vue'

	import { useEntityUpdate } from '~/mutations/entities'
	import { useFileUpload } from '~/mutations/storage'
	import { getPublicUrl } from '~/utils/storage'
	import type { Entity } from '~/utils/types'

	const { entity } = defineProps({
		entity: { type: Object as PropType<Entity>, required: true },
	})

	const { mutateAsync, error } = useEntityUpdate()
	const { mutateAsync: uploadAsync, error: uploadError } = useFileUpload()

	async function uploadFile (event: Event) {
		const file = (event.target! as HTMLInputElement).files![0]
		const extension = file.name.split('.').at(-1) ?? '.jpg'

		const { path } = await uploadAsync({ name: `entities/${entity.id}.${extension}`, file })
		const publicUrl = getPublicUrl(path)

		await mutateAsync({ id: entity.id, image: publicUrl })
	}
</script>

<template>
	<input type="file" accept="image/*" @change="uploadFile">
	<pre v-if="error">{{ error }}</pre>
	<pre v-if="uploadError">{{ uploadError }}</pre>
</template>

<style scoped>
	input[type="file"] {
		display: block;
		margin-top: 2rem;
	}
</style>

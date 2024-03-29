<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { useRoute } from 'vue-router/auto'

	import PlaceholderIcon from '~icons/ph/image-light'

	import CreateTagModal from '~/components/CreateTagModal.vue'
	import ImageUploader from '~/components/ImageUploader.vue'
	import SelectTag from '~/components/SelectTag.vue'
	import TagButton from '~/components/TagButton.vue'
	import { useModal } from '~/composables/modal'
	import { useEntityTagCreate, useEntityTagDelete } from '~/mutations/entity-tags'
	import { useEntityQuery } from '~/queries/entities'
	import { useEntityTagsQuery } from '~/queries/entity-tags'
	import { useTagsQuery } from '~/queries/tags'
	import { formatEntityName, formatEntityType } from '~/utils/entities'
	import { listEntityTags } from '~/utils/entity-tags'
	import { computeTagsMap } from '~/utils/tags'
	import type { EntityTag, Tag } from '~/utils/types'

	const route = useRoute('/admin/entities/[id]')
	const entityId = Number(route.params.id)

	const { data: entity, error } = useEntityQuery(entityId)
	const { data: entityTags } = useEntityTagsQuery({ entity_id: entityId })
	const { data: tagsMap } = useTagsQuery(computeTagsMap)

	const { mutateAsync: createEntityTagAsync } = useEntityTagCreate()
	const { mutateAsync: deleteEntityTagAsync } = useEntityTagDelete()

	const createTagModal = useModal<Tag | undefined>({ defaultValue: undefined })

	const newTag = ref<number | null>(null)

	const labeledTags = computed(() => (entityTags.value && tagsMap.value) ? listEntityTags(entityTags.value, tagsMap.value) : [])

	async function addEntityTag () {
		if (newTag.value) {
			await createEntityTagAsync({ entity_id: entityId, tag_id: newTag.value })
			newTag.value = null
		}
	}

	async function createTag () {
		const addedTag = await createTagModal.open()
		if (addedTag) {
			newTag.value = addedTag.id
		}
	}

	async function removeEntityTag (entityTag: EntityTag) {
		await deleteEntityTagAsync(entityTag)
	}
</script>

<template>
	<template v-if="entity">
		<h1>{{ formatEntityName(entity) }}</h1>
		<p class="description">{{ formatEntityType(entity) }}</p>
		<div class="entity-sections">
			<section>
				<img :src="entity.image" alt="" v-if="entity.image">
				<div class="image-placeholder" v-else>
					<PlaceholderIcon/>
				</div>
				<ImageUploader :entity="entity"/>
			</section>
			<section>
				<h2>Tags</h2>
				<form @submit.prevent="addEntityTag">
					<SelectTag v-model="newTag"/>
					<button class="button" type="submit">Adicionar</button>
					<button class="button" type="button" @click="createTag">Criar tag</button>
				</form>
				<ul class="entity-tags" v-if="labeledTags">
					<li v-for="tag of labeledTags" :key="tag.entityTag.id">
						<TagButton :label="tag.label" @remove="removeEntityTag(tag.entityTag)"/>
					</li>
				</ul>
			</section>
		</div>
	</template>
	<pre v-if="error">{{ error }}</pre>
	<CreateTagModal :controller="createTagModal"/>
</template>

<style scoped>
	.description {
		margin: -1rem 1rem 0;
	}

	.entity-sections {

		@media screen and (min-width: 769px) {
			display: grid;
			grid-template-columns: auto 1fr;
		}
	}

	:deep(section > *) {
		display: block;
		margin: 1rem;
	}

	img {
		height: auto;
		margin-inline: auto;
		max-width: 100%;
		width: 350px;
	}

	.image-placeholder {
		align-items: center;
		aspect-ratio: 1 / 1;
		background-color: #EEE;
		color: #AAA;
		display: flex;
		font-size: 2rem;
		height: auto;
		justify-content: center;
		margin-inline: auto;
		max-width: 100%;
		width: 350px;
	}

	form {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.entity-tags {
		margin-top: 2rem;
	}
</style>

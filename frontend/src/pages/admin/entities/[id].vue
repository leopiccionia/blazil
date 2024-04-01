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
	import { groupEntityTags } from '~/utils/entity-tags'
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

	const labeledTags = computed(() => (entityTags.value && tagsMap.value) ? groupEntityTags(entityTags.value, tagsMap.value) : {})

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
	<div class="entity-header" v-if="entity">
		<div class="content">
			<h1>{{ formatEntityName(entity) }}</h1>
			<p>{{ formatEntityType(entity) }}</p>
		</div>
	</div>
	<div class="content">
		<div class="entity-sections" v-if="entity">
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
				<template v-for="(sectionTags, section) of labeledTags" :key="section">
					<h3>{{ section }}</h3>
					<ul class="entity-tags">
						<li v-for="tag of sectionTags" :key="tag.entityTag.id">
							<TagButton :label="tag.label" @remove="removeEntityTag(tag.entityTag)"/>
						</li>
					</ul>
				</template>
			</section>
		</div>
		<pre v-if="error">{{ error }}</pre>
	</div>
	<CreateTagModal :controller="createTagModal"/>
</template>

<style scoped>
	.entity-header {
		background-color: var(--button-bg);
		border-bottom: 3px solid var(--button-border);
		padding: 0.1px;

		& .content {

			& > * {
				line-height: 1;
				margin: 1rem;
			}

			& p {
				margin-top: -0.5rem;
			}
		}
	}

	.entity-sections {

		@media screen and (min-width: 769px) {
			display: grid;
			gap: 0 2rem;
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
</style>

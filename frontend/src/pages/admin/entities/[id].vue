<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { useRoute } from 'vue-router/auto'

	import RemoveIcon from '~icons/ph/x'

	import ImageUploader from '~/components/ImageUploader.vue'
	import SelectTag from '~/components/SelectTag.vue'
	import { useEntityTagCreate, useEntityTagDelete } from '~/mutations/entity-tags'
	import { useEntityQuery } from '~/queries/entities'
	import { useEntityTagsQuery } from '~/queries/entity-tags'
	import { useTagsQuery } from '~/queries/tags'
	import { formatEntityName, formatEntityType } from '~/utils/entities'
	import { listEntityTags } from '~/utils/entity-tags'
	import { computeTagsMap, computeTagsTree } from '~/utils/tags'
	import type { EntityTag } from '~/utils/types'

	const route = useRoute('/admin/entities/[id]')
	const entityId = Number(route.params.id)

	const { data: entity, error } = useEntityQuery(entityId)
	const { data: entityTags } = useEntityTagsQuery({ entity_id: entityId })
	const { data: tagsMap } = useTagsQuery(computeTagsMap)
	const { data: tagsTree } = useTagsQuery(computeTagsTree)

	const { mutateAsync: createEntityTagAsync } = useEntityTagCreate()
	const { mutateAsync: deleteEntityTagAsync } = useEntityTagDelete()

	const newTag = ref<number | null>(null)

	const labeledTags = computed(() => (entityTags.value && tagsMap.value) ? listEntityTags(entityTags.value, tagsMap.value) : [])

	async function addEntityTag () {
		if (newTag.value) {
			await createEntityTagAsync({ entity_id: entityId, tag_id: newTag.value })
			newTag.value = null
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
				<img :src="entity.image" v-if="entity.image">
				<ImageUploader :entity="entity"/>
			</section>
			<section>
				<h2>Tags</h2>
				<form @submit.prevent="addEntityTag">
					<SelectTag :nodes="tagsTree" v-model="newTag" v-if="tagsTree"/>
					<button class="button" type="submit">Adicionar</button>
				</form>
				<ul class="entity-tags" v-if="labeledTags">
					<li v-for="tag of labeledTags" :key="tag.entityTag.id">
						<button class="button" type="button" @click="removeEntityTag(tag.entityTag)">
							{{ tag.label }} <RemoveIcon/>
						</button>
					</li>
				</ul>
			</section>
		</div>
	</template>
	<pre v-if="error">{{ error }}</pre>
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
		max-width: 350px;
	}

	form {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.entity-tags {
		display: flex;
		flex-wrap: wrap;
		padding: 0;

		& li {
			list-style: none;
			margin: 0 0.5rem 0.5rem 0;
			padding: 0;
		}

		& button {
			align-items: center;
			display: flex;
			font-size: 0.875rem;
			gap: 0.5ex;
			padding: 0.125rem 0.5rem;
		}
	}
</style>

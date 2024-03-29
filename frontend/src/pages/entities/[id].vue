<script setup lang="ts">
	import { computed } from 'vue'
	import { useRoute } from 'vue-router/auto'

	import PlaceholderIcon from '~icons/ph/image-light'

	import TagButton from '~/components/TagButton.vue'
	import { useEntityQuery } from '~/queries/entities'
	import { useEntityTagsQuery } from '~/queries/entity-tags'
	import { useTagsQuery } from '~/queries/tags'
	import { formatEntityName, formatEntityType } from '~/utils/entities'
	import { listEntityTags } from '~/utils/entity-tags'
	import { computeTagsMap } from '~/utils/tags'

	const route = useRoute('/entities/[id]')
	const entityId = Number(route.params.id)

	const { data: entity, error } = useEntityQuery(entityId)
	const { data: entityTags } = useEntityTagsQuery({ entity_id: entityId })
	const { data: tagsMap } = useTagsQuery(computeTagsMap)

	const labeledTags = computed(() => (entityTags.value && tagsMap.value) ? listEntityTags(entityTags.value, tagsMap.value) : [])
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
			</section>
			<section>
				<h2>Tags</h2>
				<ul class="entity-tags" v-if="labeledTags">
					<li v-for="tag of labeledTags" :key="tag.entityTag.id">
						<TagButton :label="tag.label" :removable="false"/>
					</li>
				</ul>
				<p v-if="entityTags?.length === 0">Nenhuma tag adicionada.</p>
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
</style>

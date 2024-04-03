<script setup lang="ts">
	import { computed } from 'vue'
	import { useRoute } from 'vue-router/auto'

	import PlaceholderIcon from '~icons/ph/image-light'

	import TagButton from '~/components/TagButton.vue'
	import { useTitle } from '~/composables/head'
	import { useEntityQuery } from '~/queries/entities'
	import { useEntityTagsQuery } from '~/queries/entity-tags'
	import { useTagsQuery } from '~/queries/tags'
	import { formatEntityName, formatEntityType } from '~/utils/entities'
	import { groupEntityTags } from '~/utils/entity-tags'
	import { computeTagsMap } from '~/utils/tags'

	const route = useRoute('/entidades/[id]')
	const entityId = Number(route.params.id)

	const { data: entity, error } = useEntityQuery(entityId)
	const { data: entityTags } = useEntityTagsQuery({ entity_id: entityId })
	const { data: tagsMap } = useTagsQuery(computeTagsMap)

	useTitle(() => entity.value ? formatEntityName(entity.value) : 'Entidade')

	const labeledTags = computed(() => (entityTags.value && tagsMap.value) ? groupEntityTags(entityTags.value, tagsMap.value) : {})
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
			</section>
			<section>
				<h2>Tags</h2>
				<p v-if="entityTags?.length === 0">Nenhuma tag adicionada.</p>
				<template v-for="(sectionTags, section) of labeledTags" :key="section">
					<h3>{{ section }}</h3>
					<ul class="entity-tags">
						<li v-for="tag of sectionTags" :key="tag.entityTag.id">
							<TagButton :label="tag.label" :removable="false"/>
						</li>
					</ul>
				</template>
			</section>
		</div>
		<pre v-if="error">{{ error }}</pre>
	</div>
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
</style>

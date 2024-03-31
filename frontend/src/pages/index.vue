<script setup lang="ts">
	import { computed, reactive } from 'vue'

	import FiltersBar from '~/components/FiltersBar.vue'
	import TagButton from '~/components/TagButton.vue'
	import { provideSelectTag } from '~/composables/injections'
	import { useEntitiesWithTagQuery } from '~/queries/entities'
	import type { EntitiesWithTagFilters } from '~/queries/entities'
	import { useTagsQuery } from '~/queries/tags'
	import { formatEntityName, formatEntityType } from '~/utils/entities'
	import { computeTagsMap } from '~/utils/tags'
	import type { Tag } from '~/utils/types'

	const filters = reactive<EntitiesWithTagFilters>({
		tags: [],
		ufs: [],
	})

	const { data, error, fetchNextPage, hasNextPage } = useEntitiesWithTagQuery(filters)
	const { data: tagsMap } = useTagsQuery(computeTagsMap)

	const entitiesCount = computed(() => {
		if (!data.value) {
			return 0
		}
		return data.value.pages.reduce((acc, curr) => acc + curr.count, 0)
	})

	function removeTag (tagId: number) {
		filters.tags = filters.tags.filter((item) => item !== tagId)
	}

	function removeUF (uf: string) {
		filters.ufs = filters.ufs.filter((item) => item !== uf)
	}

	function selectTag (tag: Tag) {
		if (!filters.tags.includes(tag.id)) {
			filters.tags = [...filters.tags, tag.id].sort(sortByNumber)
		}
	}

	function sortByNumber (a: number, b: number) {
		return a - b
	}

	provideSelectTag(selectTag)
</script>

<template>
	<div class="content">
		<h1>Pesquisar</h1>
		<div class="home-sections">
			<aside>
				<FiltersBar v-model:filters="filters"/>
			</aside>
			<main>
				<h2 v-if="entitiesCount === 0">Nenhum resultado encontrado</h2>
				<h2 v-else-if="entitiesCount === 1">Exibindo 1 resultado</h2>
				<h2 v-else>Exibindo {{ entitiesCount }} resultados</h2>
				<ul class="entity-tags" v-if="(filters.ufs.length + filters.tags.length) > 0">
					<li v-for="uf of filters.ufs" :key="uf">
						<TagButton :label="uf" @remove="removeUF(uf)"/>
					</li>
					<li v-for="tag of filters.tags" :key="tag">
						<TagButton :label="tagsMap?.[tag]?.name ?? ''" @remove="removeTag(tag)"/>
					</li>
				</ul>
				<div class="entity-cards" v-if="data">
					<template v-for="page of data.pages" :key="page.page">
						<article class="entity-card" v-for="entity of page.data" :key="entity.id">
							<RouterLink class="entity-image" :to="{ name: '/entities/[id]', params: { id: entity.id } }">
								<img :src="entity.image!" :alt="entity.name" loading="lazy">
							</RouterLink>
							<div class="entity-name">{{ formatEntityName(entity) }}</div>
							<div class="entity-type">{{ formatEntityType(entity) }}</div>
						</article>
					</template>
				</div>
				<button class="button see-more" v-if="hasNextPage" @click="fetchNextPage()">Ver mais</button>
				<pre v-if="error">{{ error }}</pre>
			</main>
		</div>
	</div>
</template>

<style scoped>
	.home-sections {

		@media screen and (min-width: 769px) {
			display: grid;
			grid-template-columns: auto 1fr;
		}
	}

	main {

		& > * {
			margin: 1rem;
		}
	}

	.entity-cards {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(12rem, auto));
	}

	.entity-card {
		border: 1px solid #EEE;
		border-radius: 0.25rem;
		padding: 1rem;

		& .entity-image {
			aspect-ratio: 1 / 1;
			display: block;
			height: auto;
			width: 100%;

			& img {
				height: 100%;
				object-fit: contain;
				object-position: center;
				width: 100%;
			}
		}

		& .entity-name {
			color: var(--green);
			font-family: var(--heading-font);
			margin-top: 0.5rem;
		}

		& .entity-type {
			font-size: 0.875rem;
		}
	}

	.see-more {
		display: block;
		margin: 1rem auto !important;
	}
</style>

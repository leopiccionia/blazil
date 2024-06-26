<script setup lang="ts">
	import { useInfiniteScroll } from '@vueuse/core'
	import { computed, ref } from 'vue'

	import FiltersBar from '~/components/FiltersBar.vue'
	import TagButton from '~/components/TagButton.vue'
	import { useFilters } from '~/composables/filters'
	import { useTitle } from '~/composables/head'
	import { useEntitiesWithTagQuery } from '~/queries/entities'
	import { useTagsQuery } from '~/queries/tags'
	import { formatEntityName, formatEntityType } from '~/utils/entities'
	import { compareTagIds, computeTagsMap } from '~/utils/tags'

	const filters = useFilters()

	const { data, error, fetchNextPage, hasNextPage } = useEntitiesWithTagQuery(filters)
	const { data: tagsMap } = useTagsQuery(computeTagsMap)

	useTitle('Pesquisa')

	const seeMoreButton = ref<HTMLButtonElement | null>(null)

	const entitiesCount = computed(() => {
		if (!data.value) {
			return 0
		}
		return data.value.pages.reduce((acc, curr) => acc + curr.count, 0)
	})

	const sortedTags = computed(() => [...filters.tags.values()].sort(tagsMap.value ? compareTagIds(tagsMap.value) : compareNumbers))
	const sortedUFs = computed(() => [...filters.ufs.values()].sort())

	useInfiniteScroll(seeMoreButton, () => {
		if (hasNextPage) {
			fetchNextPage()
		}
	})

	function compareNumbers (a: number, b: number): number {
		return a - b
	}

	function removeTag (tagId: number) {
		filters.tags.delete(tagId)
	}

	function removeUF (uf: string) {
		filters.ufs.delete(uf)
	}
</script>

<template>
	<div class="content">
		<h1>Pesquisa</h1>
		<div class="home-sections">
			<aside>
				<FiltersBar v-model:filters="filters"/>
			</aside>
			<main>
				<h2 v-if="entitiesCount === 0">Nenhum resultado encontrado</h2>
				<h2 v-else-if="entitiesCount === 1">Exibindo 1 resultado</h2>
				<h2 v-else>Exibindo {{ entitiesCount }} resultados</h2>
				<ul class="entity-tags" v-if="filters.ufs.size > 0">
					<li key="">UFs:</li>
					<li v-for="uf of sortedUFs" :key="uf">
						<TagButton :label="uf" @remove="removeUF(uf)"/>
					</li>
				</ul>
				<ul class="entity-tags" v-if="filters.tags.size > 0">
					<li :key="0">Tags:</li>
					<li v-for="tag of sortedTags" :key="tag">
						<TagButton :label="tagsMap?.[tag]?.name ?? ''" @remove="removeTag(tag)"/>
					</li>
				</ul>
				<div class="entity-cards" v-if="data">
					<template v-for="page of data.pages" :key="page.page">
						<article class="entity-card" v-for="entity of page.data" :key="entity.id">
							<RouterLink class="entity-image" :to="{ name: '/entidades/[id]', params: { id: entity.id } }">
								<img :src="entity.image!" :alt="entity.name" loading="lazy">
							</RouterLink>
							<div class="entity-name">{{ formatEntityName(entity) }}</div>
							<div class="entity-type">{{ formatEntityType(entity) }}</div>
						</article>
					</template>
				</div>
				<button ref="seeMoreButton" class="button see-more" v-if="hasNextPage" @click="fetchNextPage()">Ver mais</button>
				<pre v-if="error">{{ error }}</pre>
			</main>
		</div>
	</div>
</template>

<style scoped>
	.home-sections {

		@media screen and (min-width: 769px) {
			display: grid;
			gap: 0 1rem;
			grid-template-columns: auto 1fr;
		}
	}

	main {

		& > * {
			margin: 1rem;
		}
	}

	.entity-tags + .entity-tags {
		margin-top: -0.75rem;
	}

	.entity-cards {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
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

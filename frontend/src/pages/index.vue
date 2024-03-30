<script setup lang="ts">
	import { computed, reactive, ref } from 'vue'

	import AddTagButtons from '~/components/AddTagButtons.vue'
	import SelectTag from '~/components/SelectTag.vue'
	import StatesTree from '~/components/StatesTree.vue'
	import TagButton from '~/components/TagButton.vue'
	import TagsRootTree from '~/components/TagsRootTree.vue'
	import { provideSelectTag } from '~/composables/injections'
	import { useEntitiesWithTagQuery } from '~/queries/entities'
	import type { EntitiesWithTagParams } from '~/queries/entities'
	import { useTagsQuery } from '~/queries/tags'
	import { formatEntityName, formatEntityType } from '~/utils/entities'
	import { computeTagsMap } from '~/utils/tags'
	import type { Tag } from '~/utils/types'

	const params = reactive<EntitiesWithTagParams>({
		tags: [],
		ufs: [],
	})

	const inputTag = ref<number | null>(null)

	const { data, error, fetchNextPage, hasNextPage } = useEntitiesWithTagQuery(params)
	const { data: tagsMap } = useTagsQuery(computeTagsMap)

	const entitiesCount = computed(() => {
		if (!data.value) {
			return 0
		}
		return data.value.pages.reduce((acc, curr) => acc + curr.count, 0)
	})

	function addInputTag () {
		if (inputTag.value && !params.tags.includes(inputTag.value)) {
			params.tags = [...params.tags, inputTag.value].sort(sortByNumber)
		}
		inputTag.value = null
	}

	function removeTag (tagId: number) {
		params.tags = params.tags.filter((item) => item !== tagId)
	}

	function removeUF (uf: string) {
		params.ufs = params.ufs.filter((item) => item !== uf)
	}

	function selectTag (tag: Tag) {
		if (!params.tags.includes(tag.id)) {
			params.tags = [...params.tags, tag.id].sort(sortByNumber)
		}
	}

	function sortByNumber (a: number, b: number) {
		return a - b
	}

	provideSelectTag(selectTag)
</script>

<template>
	<h1>Pesquisar</h1>
	<div class="home">
		<aside>
			<h2>Localização</h2>
			<StatesTree v-model="params.ufs"/>

			<h2>Tags</h2>
			<SelectTag v-model="inputTag" @update:model-value="addInputTag"/>
			<TagsRootTree :action="AddTagButtons"/>
		</aside>
		<main>
			<h2 v-if="entitiesCount === 0">Nenhum resultado encontrado</h2>
			<h2 v-else-if="entitiesCount === 1">Exibindo um resultado</h2>
			<h2 v-else>Exibindo {{ entitiesCount }} resultados</h2>
			<ul class="entity-tags" v-if="(params.ufs.length + params.tags.length) > 0">
				<li v-for="uf of params.ufs" :key="uf">
					<TagButton :label="uf" @remove="removeUF(uf)"/>
				</li>
				<li v-for="tag of params.tags" :key="tag">
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
</template>

<style scoped>
	.home {
		@media screen and (min-width: 769px) {
			display: grid;
			grid-template-columns: auto 1fr;
		}
	}

	aside, main {

		& > * {
			margin: 1rem;
		}
	}

	aside {
		background-color: var(--blue);
		border-radius: 0.25rem;
		min-width: 15rem;
		padding: 0.1px;

		& h2 {
			color: var(--yellow);
		}

		& :deep(.tags-tree) {
			color: white;
			margin: 1rem;
		}

		& :deep(.tags-tree svg) {
			color: var(--yellow);
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

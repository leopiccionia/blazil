<script setup lang="ts">
	import { reactive } from 'vue'

	import AddTagButtons from '~/components/AddTagButtons.vue'
	import StatesTree from '~/components/StatesTree.vue'
	import TagButton from '~/components/TagButton.vue'
	import TagsRootTree from '~/components/TagsRootTree.vue'
	import { provideSelectTag } from '~/composables/injections'
	import { useEntitiesWithTagQuery } from '~/queries/entities'
	import type { EntitiesWithTagParams } from '~/queries/entities'
	import { useTagsQuery } from '~/queries/tags'
	import { computeTagsMap } from '~/utils/tags'
	import type { Tag } from '~/utils/types'

	const params = reactive<EntitiesWithTagParams>({
		tags: [],
		ufs: [],
	})

	const { data, error } = useEntitiesWithTagQuery(params)
	const { data: tagsMap } = useTagsQuery(computeTagsMap)

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
			<TagsRootTree :action="AddTagButtons"/>
		</aside>
		<main>
			<h2>Exibindo 0 resultados</h2>
			<ul class="entity-tags">
				<li v-for="uf of params.ufs" :key="uf">
					<TagButton :label="uf" @remove="removeUF(uf)"/>
				</li>
				<li v-for="tag of params.tags" :key="tag">
					<TagButton :label="tagsMap?.[tag]?.name ?? ''" @remove="removeTag(tag)"/>
				</li>
			</ul>
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
		background-color: #F7F7F7;
		min-width: 15rem;
		padding: 0.1px;

		& > :deep(ul) {
			margin: 1rem;
		}
	}
</style>

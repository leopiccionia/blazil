<script setup lang="ts">
	import { refDebounced } from '@vueuse/core'
	import { reactive, ref, watch } from 'vue'

	import { useEntitiesQuery } from '~/queries/entities'
	import type { EntitiesFilters } from '~/queries/entities'
	import { formatEntityName } from '~/utils/entities'

	const filters = reactive<EntitiesFilters>({ search: '', withImage: null })
	const search = ref('')
	const searchDebounced = refDebounced(search, 1000)

	watch(searchDebounced, (text) => {
		filters.search = text
	})

	const { data, error, fetchNextPage, hasNextPage } = useEntitiesQuery(filters)
</script>

<template>
	<h1>Entities</h1>
	<input class="form-field" type="search" v-model="search" aria-label="Filtrar entidades">
	<div class="image-filters">
		<label>
			<span>Todas</span>
			<input type="radio" :value="null" v-model="filters.withImage">
		</label>
		<label>
			<span>Com imagem</span>
			<input type="radio" :value="true" v-model="filters.withImage">
		</label>
		<label>
			<span>Sem imagem</span>
			<input type="radio" :value="false" v-model="filters.withImage">
		</label>
	</div>
	<ul v-if="data">
		<template v-for="page of data.pages" :key="page.page">
			<li v-for="entity of page.data" :key="entity.id">
				<RouterLink :class="{ active: entity.image, inactive: !entity.image }" :to="{ name: '/admin/entities/[id]', params: { id: entity.id } }">
					{{ formatEntityName(entity) }}
				</RouterLink>
			</li>
		</template>
	</ul>
	<button class="button see-more" v-if="hasNextPage" @click="fetchNextPage()">Ver mais</button>
	<pre v-if="error">{{ error }}</pre>
</template>

<style scoped>
	input[type="search"] {
		display: block;
		margin: 1rem;
		max-width: 300px;
		width: 100%;
	}

	.image-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0 1rem;
		margin: 1rem;

		& label {
			align-items: center;
			display: flex;
			flex-direction: row-reverse;

			& input[type="radio"] {
				margin: 0 1ch 0 0;
			}
		}
	}

	ul {
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		margin: 1rem;
		padding: 0;

		& li {
			list-style: none;
		}

		& a {
			color: #44F;

			&.inactive {
				color: #F44;
			}
		}
	}

	.see-more {
		display: block;
		margin: 1rem auto;
	}
</style>

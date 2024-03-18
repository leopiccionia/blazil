<script setup lang="ts">
	import { refDebounced } from '@vueuse/core'
	import { ref } from 'vue'

	import { useEntitiesQuery } from '../../queries/entities'
	import { formatEntityName } from '../../utils/entities'

	const search = ref('')
	const searchDebounced = refDebounced(search, 1000)

	const { data, error, fetchNextPage, hasNextPage } = useEntitiesQuery(searchDebounced)
</script>

<template>
	<h1>Entities</h1>
	<input type="search" v-model="search">
	<ul v-if="data">
		<template v-for="page of data.pages" :key="page.page">
			<li v-for="entity of page.data" :key="entity.id">
				<RouterLink :class="{ active: entity.image, inactive: !entity.image }" :to="{ name: '/entities/[id]', params: { id: entity.id } }">
					{{ formatEntityName(entity) }}
				</RouterLink>
			</li>
		</template>
	</ul>
	<button v-if="hasNextPage" @click="fetchNextPage()">Ver mais</button>
	<pre v-if="error">{{ error }}</pre>
</template>

<style scoped>
	h1 {
		margin: 1rem;
	}

	ul {
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

		& li {
			list-style: none;
		}

		& a {
			color: blue;

			&.inactive {
				color: red;
			}
		}
	}
</style>

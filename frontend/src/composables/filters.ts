import { onMounted, reactive, watch } from 'vue'

import type { EntitiesWithTagFilters } from '~/queries/entities'

function buildParams (filters: EntitiesWithTagFilters): string {
	const params = new URLSearchParams()

	for (const uf of filters.ufs) {
		params.append('uf', uf)
	}
	for (const tag of filters.tags) {
		params.append('tag', String(tag))
	}

	return '?' + params.toString()
}

export function useFilters (): EntitiesWithTagFilters {
	const filters = reactive<EntitiesWithTagFilters>({
		tags: new Set(),
		ufs: new Set(),
	})

	onMounted(() => {
		const params = new URLSearchParams(window.location.search)

		if (params.has('tag')) {
			filters.tags = new Set(params.getAll('tag').map(Number))
		}
		if (params.has('uf')) {
			filters.ufs = new Set(params.getAll('uf'))
		}
	})

	watch(() => filters, () => {
		window.history.replaceState(window.history.state, '', buildParams(filters))
	}, { deep: true })

	return filters
}

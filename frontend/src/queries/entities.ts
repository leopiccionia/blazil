import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import type { MaybeRef } from 'vue'

import { infiniteQueryResult, queryResult } from '~/utils/queries'
import { supabase } from '~/utils/supabase'
import type { Entity, Paginated } from '~/utils/types'

export type EntitiesFilters = {
	search: string,
	withImage: boolean | null,
}

export type EntitiesWithTagFilters = {
	tags: Set<number>,
	ufs: Set<string>,
}

export function useEntitiesQuery (filters: MaybeRef<EntitiesFilters>) {
	const PAGE_SIZE = 500

	return useInfiniteQuery({
		queryKey: ['entities', filters] as const,
		async queryFn ({ queryKey: [_, filters], pageParam }) {
			const query = supabase.from('entities')
				.select()
				.range((pageParam - 1) * PAGE_SIZE, (pageParam * PAGE_SIZE) - 1)
				.order('id', { ascending: true })

			if (filters.search) {
				query.ilike('name', `%${filters.search.replace('%', '')}%`)
			}

			if (filters.withImage === true) {
				query.not('image', 'is', null)
			} else if (filters.withImage === false) {
				query.is('image', null)
			}

			const { data, error } = await query.returns<Entity[]>()
			return infiniteQueryResult(data, error, pageParam)
		},
		initialPageParam: 1,
		getNextPageParam: ({ count, page }: Paginated<Entity>) => (count === PAGE_SIZE) ? (page + 1) : undefined,
	})
}

export function useEntitiesWithTagQuery (filters: EntitiesWithTagFilters) {
	const PAGE_SIZE = 100

	const tags = computed(() => [...filters.tags.values()])
	const ufs = computed(() => [...filters.ufs.values()])

	return useInfiniteQuery({
		queryKey: ['entities_with_tags', tags, ufs] as const,
		async queryFn ({ queryKey: [_, tags, ufs], pageParam }) {
			const query = supabase.rpc('entities_with_tags', { tag_ids: tags })
				.select()
				.range((pageParam - 1) * PAGE_SIZE, (pageParam * PAGE_SIZE) - 1)
				.order('id', { ascending: true })

			if (ufs.length > 0) {
				query.in('uf', ufs)
			}

			const { data, error } = await query.returns<Entity[]>()
			return infiniteQueryResult(data, error, pageParam)
		},
		initialPageParam: 1,
		getNextPageParam: ({ count, page }: Paginated<Entity>) => (count === PAGE_SIZE) ? (page + 1) : undefined,
	})
}

export function useEntityQuery (entityId: number) {
	return useQuery({
		queryKey: ['entities', entityId] as const,
		async queryFn ({ queryKey: [_, entityId] }) {
			const query = supabase.from('entities')
				.select()
				.eq('id', entityId)
				.limit(1)

			const { data, error } = await query.single<Entity>()
			return queryResult(data, error)
		},
	})
}

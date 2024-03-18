import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import type { MaybeRef } from 'vue'

import { infiniteQueryResult, queryResult } from '../utils/queries'
import supabase from '../utils/supabase'
import type { Paginated, Entity } from '../utils/types'

export function useEntitiesQuery (search: MaybeRef<string>) {
	const PAGE_SIZE = 500

	return useInfiniteQuery({
		queryKey: ['entities', search] as const,
		async queryFn ({ queryKey: [_, search], pageParam }) {
			const query = supabase.from('entities')
				.select()
				.range((pageParam - 1) * PAGE_SIZE, (pageParam * PAGE_SIZE) - 1)
				.order('id', { ascending: true })

			if (search) {
				query.ilike('name', `%${search.replace('%', '')}%`)
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

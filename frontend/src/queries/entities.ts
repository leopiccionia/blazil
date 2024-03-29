import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import type { MaybeRef } from 'vue'

import { infiniteQueryResult, queryResult } from '~/utils/queries'
import { supabase } from '~/utils/supabase'
import type { Entity, Paginated } from '~/utils/types'

export type EntitiesParams = {
	search: string,
	withImage: boolean | null,
}

export type EntitiesWithTagParams = {
	tags: number[],
	ufs: string[],
}

export function useEntitiesQuery (params: MaybeRef<EntitiesParams>) {
	const PAGE_SIZE = 500

	return useInfiniteQuery({
		queryKey: ['entities', params] as const,
		async queryFn ({ queryKey: [_, params], pageParam }) {
			const query = supabase.from('entities')
				.select()
				.range((pageParam - 1) * PAGE_SIZE, (pageParam * PAGE_SIZE) - 1)
				.order('id', { ascending: true })

			if (params.search) {
				query.ilike('name', `%${params.search.replace('%', '')}%`)
			}

			if (params.withImage === true) {
				query.not('image', 'is', null)
			} else if (params.withImage === false) {
				query.is('image', null)
			}

			const { data, error } = await query.returns<Entity[]>()
			return infiniteQueryResult(data, error, pageParam)
		},
		initialPageParam: 1,
		getNextPageParam: ({ count, page }: Paginated<Entity>) => (count === PAGE_SIZE) ? (page + 1) : undefined,
	})
}

export function useEntitiesWithTagQuery (params: EntitiesWithTagParams) {
	const PAGE_SIZE = 500

	return useInfiniteQuery({
		queryKey: ['entities_with_tags', params] as const,
		async queryFn ({ queryKey: [_, params], pageParam }) {
			const query = supabase.rpc('entities_with_tags', { tag_ids: params.tags })
				.select()
				.range((pageParam - 1) * PAGE_SIZE, (pageParam * PAGE_SIZE) - 1)
				.order('id', { ascending: true })

			if (params.ufs.length > 0) {
				query.in('uf', params.ufs)
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

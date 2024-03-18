import { useQuery } from '@tanstack/vue-query'

import { queryResult } from '../utils/queries'
import supabase from '../utils/supabase'
import type { Tag } from '../utils/types'

export function useTagsQuery<T> (selector: (input: Tag[]) => T) {
	return useQuery({
		queryKey: ['tags'] as const,
		queryFn: async () => {
			const query = supabase.from('tags')
				.select()

			const { data, error } = await query.returns<Tag[]>()
			return queryResult(data, error)
		},
		select: selector,
	})
}

import { useQuery } from '@tanstack/vue-query'

import { queryResult } from '~/utils/queries'
import { supabase } from '~/utils/supabase'
import type { EntityTag } from '~/utils/types'

const TRUE = () => true

export function useEntityTagsQuery (filters: Partial<EntityTag>, enabled = TRUE) {
	return useQuery({
		enabled,
		queryKey: ['entity_tags', filters] as const,
		async queryFn ({ queryKey: [_, filters] }) {
			const query = supabase.from('entity_tags')
				.select()
				.match(filters)

			const { data, error } = await query.returns<EntityTag[]>()
			return queryResult(data, error)
		},
	})
}

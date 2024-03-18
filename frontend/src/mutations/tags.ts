import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { queryResult } from '../utils/queries'
import supabase from '../utils/supabase'
import type { Tag } from '../utils/types'

export function useTagCreate () {
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn ({ name, parent_id }: Pick<Tag, 'name' | 'parent_id'>) {
			const mutation = supabase.from('tags')
				.insert({ name, parent_id })
				.select()

			const { data, error } = await mutation.returns<Tag[]>()
			return queryResult(data, error)
		},
		onSuccess (newTag) {
			if (newTag) {
				queryClient.setQueryData<Tag[]>(['tags'], (tags) => [...(tags ?? []), ...newTag])
			}
		},
	})
}

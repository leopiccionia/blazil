import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { queryResult } from '../utils/queries'
import supabase from '../utils/supabase'
import type { EntityTag } from '../utils/types'

export function useEntityTagCreate () {
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn (params: Omit<EntityTag, 'id'>) {
			const mutation = supabase.from('entity_tags')
				.insert(params)
				.select()

			const { data, error } = await mutation.returns<EntityTag[]>()
			return queryResult(data, error)
		},
		onSuccess (newTag) {
			if (newTag) {
				queryClient.setQueryData<EntityTag[]>(['entity_tags', { entity_id: newTag[0].entity_id }], (tags) => [...(tags ?? []), ...newTag])
			}
		},
	})
}

export function useEntityTagDelete () {
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn (entityTag: EntityTag) {
			const mutation = supabase.from('entity_tags')
				.delete()
				.eq('id', entityTag.id)

			const { data, error } = await mutation
			return queryResult(data, error)
		},
		onSuccess (_, entityTag) {
			queryClient.setQueryData<EntityTag[]>(['entity_tags', { entity_id: entityTag.entity_id }], (tags) => tags?.filter((tag) => tag.id != entityTag.id))
		},
	})
}

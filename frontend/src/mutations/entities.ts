import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { queryResult } from '~/utils/queries'
import { supabase } from '~/utils/supabase'
import type { Entity } from '~/utils/types'

export function useEntityUpdate () {
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn ({ id, ...rest }: Pick<Entity, 'id'> & Partial<Entity>) {
			const mutation = supabase.from('entities')
				.update({ ...rest })
				.eq('id', id)
				.select()

			const { data, error } = await mutation.returns<Entity[]>()
			return queryResult(data, error)
		},
		onSuccess ([newData]) {
			queryClient.setQueryData<Entity>(['entities', newData.id], (entity) => ({ ...(entity ?? {}) , ...newData }))
		},
	})
}

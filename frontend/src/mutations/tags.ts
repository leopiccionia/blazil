import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { queryResult } from '~/utils/queries'
import { supabase } from '~/utils/supabase'
import type { Tag } from '~/utils/types'

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

export function useTagDelete () {
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn (tag: Tag) {
			const mutation = supabase.from('tags')
				.delete()
				.eq('id', tag.id)

			const { data, error } = await mutation
			return queryResult(data, error)
		},
		onSuccess (_, tag) {
			queryClient.setQueryData<Tag[]>(['tags'], (tags) => tags?.filter((t) => t.id != tag.id))
		},
	})
}

export function useTagUpdate () {
	const queryClient = useQueryClient()

	return useMutation({
		async mutationFn ({ id, ...rest }: Pick<Tag, 'id'> & Partial<Tag>) {
			const mutation = supabase.from('tags')
				.update({ ...rest })
				.eq('id', id)
				.select()

			const { data, error } = await mutation.returns<Tag[]>()
			return queryResult(data, error)
		},
		onSuccess ([newData]) {
			queryClient.setQueryData<Tag[]>(['tags'], (tags) => tags?.map((tag) => (tag.id == newData.id) ? { ...tag, ...newData } : tag))
		},
	})
}

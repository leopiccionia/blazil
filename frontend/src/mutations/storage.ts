import { useMutation } from '@tanstack/vue-query'

import { queryResult } from '../utils/queries'
import supabase from '../utils/supabase'

type UploadSize = {
	name: string,
	file: File,
}

export function useFileUpload () {
	return useMutation({
		async mutationFn ({ file, name }: UploadSize) {
			const mutation = supabase.storage.from('images')
				.upload(name, file, { cacheControl: '3600', upsert: true })

			const { data, error } = await mutation
			return queryResult(data, error)
		},
	})
}

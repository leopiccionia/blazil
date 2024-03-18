import prettyBytes from 'pretty-bytes'

import { supabase } from '~/utils/supabase'

export function fileSize (file: File): string {
	return prettyBytes(file.size)
}

export function getPublicUrl (path: string): string {
	const { data } = supabase.storage.from('images').getPublicUrl(path)
	return data.publicUrl
}

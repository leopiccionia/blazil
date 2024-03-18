import { supabase } from '~/utils/supabase'

export function getPublicUrl (path: string): string {
	const { data } = supabase.storage.from('images').getPublicUrl(path)
	return data.publicUrl
}

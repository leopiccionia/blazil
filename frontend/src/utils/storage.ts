import supabase from './supabase'

export function getPublicUrl (path: string): string {
	const { data } = supabase.storage.from('images').getPublicUrl(path)
	return data.publicUrl
}

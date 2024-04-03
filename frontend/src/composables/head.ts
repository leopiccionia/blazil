import { useHead } from '@unhead/vue'
import type { MaybeRefOrGetter } from 'vue'

type TitleOptions = {
	admin?: boolean,
}

export function useTitle (title: MaybeRefOrGetter<string>, { admin = false }: TitleOptions = {}) {
	useHead({
		title,
		titleTemplate: admin ? 'Admin: %s - Blazil' : '%s - Blazil',
	})
}

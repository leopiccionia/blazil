import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

import type { Tag } from '~/utils/types'

type SelectTagFn = (node: Tag) => void

const SelectTagInjector = Symbol() as InjectionKey<SelectTagFn>

export function provideSelectTag (callback: SelectTagFn) {
	provide(SelectTagInjector, callback)
}

export function useSelectTag () {
	return inject(SelectTagInjector)!
}

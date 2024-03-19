import type { InjectionKey } from 'vue'

import type { TagNode } from '~/utils/types'

export const InjectSelectTag = Symbol() as InjectionKey<(tag: TagNode) => void>

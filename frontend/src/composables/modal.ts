import { ref } from 'vue'

type ModalControllerSettings<T> = {
	defaultValue: T,
	startOpen?: boolean,
}

type ResolveFn<T> = (value: T) => void

export function useModal<T> ({ defaultValue, startOpen = false }: ModalControllerSettings<T>) {
	const isOpen = ref(startOpen)
	const resolver = ref<ResolveFn<T> | null>(null)

	const open = () => {
		return new Promise<T>((resolve) => {
			resolver.value = resolve
			isOpen.value = true
		})
	}

	const close = (result: T = defaultValue) => {
		resolver.value?.(result)
		isOpen.value = false
	}

	return { close, isOpen, open }
}

export type ModalController<T> = ReturnType<typeof useModal<T>>

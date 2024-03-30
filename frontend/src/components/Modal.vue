<script setup lang="ts" generic="T">
	import { ref, watch } from 'vue'
	import type { PropType } from 'vue'

	import RemoveIcon from '~icons/ph/x-bold'

	import type { ModalController } from '~/composables/modal'

	const { controller, title } = defineProps({
		controller: { type: Object as PropType<ModalController<T>>, required: true },
		title: { type: String, required: true },
	})

	const dialogEl = ref<HTMLDialogElement | null>(null)

	watch(controller.isOpen, (isOpen) => {
		if (isOpen) {
			dialogEl.value!.showModal()
		} else {
			dialogEl.value!.close()
		}
	})
</script>

<template>
	<dialog ref="dialogEl" @cancel="controller.close()">
		<article>
			<header>
				<h2>{{ title }}</h2>
				<button type="button" title="Fechar" @click="controller.close()">
					<RemoveIcon/>
				</button>
			</header>
			<main><slot/></main>
		</article>
	</dialog>
</template>

<style scoped>
	dialog {
		border: 1px solid #CCC;
		border-radius: 0.25rem;
		overflow: inherit;
		padding: 1rem;

		&::backdrop {
			backdrop-filter: blur(3px);
		}
	}

	article {

		& > header {
			align-items: flex-start;
			display: flex;
			justify-content: space-between;

			& button {
				color: var(--red);
				line-height: 0;
			}
		}

		& > main {
			margin-top: 1rem;
		}

		& h2 {
			font-size: 1.25rem;
			font-weight: bold;
			margin: 0;
		}

		& :deep(.buttons) {
			align-items: center;
			display: flex;
			gap: 0.5rem;
			justify-content: flex-end;
			margin-top: 2rem;
		}
	}
</style>

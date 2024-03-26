<script setup lang="ts">
	import RemoveIcon from '~icons/ph/x-bold'

	const emit = defineEmits<{
		toggle: [],
	}>()

	const { label } = defineProps({
		label: { type: String, required: true },
	})
</script>

<template>
	<div class="tag">
		<span class="remove-tag">
			{{ label }}
			<button type="button" title="Remover tag" @click="emit('toggle')"><RemoveIcon/></button>
		</span>
	</div>
</template>

<style scoped>
	.tag {
		--border-radius: 0.25rem;
		--font-size: 0.875rem;
		--padding: 0.25rem;
		--height: calc((var(--font-size) + 2 * var(--padding)) / sqrt(2));

		align-items: center;
		background-color: #EEE;
		border: 1px solid #CCC;
		border-inline-start-width: 0;
		border-radius: var(--border-radius);
		display: flex;
		font-size: var(--font-size);
		line-height: 1;
		margin-inline-start: calc(var(--height) / 2);
		padding: var(--padding);
		position: relative;
		text-align: center;
		white-space: nowrap;

		&::before {
			content: '';
			background-color: #EEE;
			border: 1px solid #CCC;
			border-radius: var(--border-radius);
			height: var(--height);
			left: calc(var(--height) / -2);
			position: absolute;
			transform: rotate(45deg);
			width: var(--height);
			z-index: -1;
		}

		& .remove-tag {
			align-items: center;
			display: flex;
			gap: 0.5ex;

			& button {
				line-height: 0;
			}

			& svg {
				color: #999;
				height: 1em;
				width: 1em;
			}
		}
	}
</style>

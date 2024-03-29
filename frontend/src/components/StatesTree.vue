<script setup lang="ts">
	import { ref } from 'vue'

	import AddButton from '~icons/ph/plus-circle'
	import LeafIcon from '~icons/ph/dot-bold'
	import MaximizeIcon from '~icons/ph/caret-down-bold'
	import MinimizeIcon from '~icons/ph/caret-up-bold'

	import { groupUFsByRegion, listUFs } from '~/utils/entities'

	const model = defineModel<string[]>({ required: true })

	const showRegions = ref(false)
	const showStates = ref(false)

	const regions = groupUFsByRegion()
	const ufs = listUFs()

	function selectRegion (ufs: string[]) {
		for (const uf of ufs) {
			if (!model.value.includes(uf)) {
				model.value.push(uf)
			}
			model.value.sort()
		}
	}

	function selectUF (uf: string) {
		if (!model.value.includes(uf)) {
			model.value = [...model.value, uf].sort()
		}
	}
</script>

<template>
	<ul class="tags-tree">
		<li>
			<label>
				<component :is="showRegions ? MinimizeIcon : MaximizeIcon"/>
				<input type="checkbox" v-model="showRegions">
				<span>Regiões</span>
			</label>
			<ul v-if="showRegions">
				<li v-for="(ufs, label) of regions" :key="label">
					<label>
						<LeafIcon/>
						<span>{{ label }}</span>
						<button type="button" :title="`Filtrar por &quot;${label}&quot;`" @click="selectRegion(ufs)">
							<AddButton/>
						</button>
					</label>
				</li>
			</ul>
		</li>
		<li>
			<label>
				<component :is="showStates ? MinimizeIcon : MaximizeIcon"/>
				<input type="checkbox" v-model="showStates">
				<span>Estados</span>
			</label>
			<ul v-if="showStates">
				<li v-for="(label, uf) of ufs" :key="uf">
					<label>
						<LeafIcon/>
						<span>{{ label }}</span>
						<button type="button" :title="`Filtrar por &quot;${label}&quot;`" @click="selectUF(uf)">
							<AddButton/>
						</button>
					</label>
				</li>
			</ul>
		</li>
	</ul>
</template>

<style scoped>
	button {
		color: #888;
		line-height: 0;
		margin-inline-start: 0.5ex;
	}
</style>

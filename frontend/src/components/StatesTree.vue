<script setup lang="ts">
	import { ref } from 'vue'

	import AddButton from '~icons/ph/plus-circle-bold'
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
				<input type="checkbox" v-model="showRegions">
				<span>Regiões</span>
				<component class="arrow-icon" :is="showRegions ? MinimizeIcon : MaximizeIcon"/>
			</label>
			<ul class="level-1" v-if="showRegions">
				<li v-for="(ufs, label) of regions" :key="label">
					<label>
						<button type="button" :title="`Filtrar por &quot;${label}&quot;`" @click="selectRegion(ufs)">
							<AddButton/>
						</button>
						<span>{{ label }}</span>
					</label>
				</li>
			</ul>
		</li>
		<li>
			<div class="tree-row">
				<label>
					<input type="checkbox" v-model="showStates">
					<span>Estados</span>
					<component class="arrow-icon":is="showStates ? MinimizeIcon : MaximizeIcon"/>
				</label>
			</div>
			<ul class="level-1" v-if="showStates">
				<li v-for="(label, uf) of ufs" :key="uf">
					<label>
						<button type="button" :title="`Filtrar por &quot;${label}&quot;`" @click="selectUF(uf)">
							<AddButton/>
						</button>
						<span>{{ label }}</span>
					</label>
				</li>
			</ul>
		</li>
	</ul>
</template>

<style scoped>
	button {
		line-height: 0;
		margin-inline-end: 0.5ex;
	}

	svg.arrow-icon {
		margin-inline-start: 0.5ex;
		margin-inline-end: 0;
	}
</style>

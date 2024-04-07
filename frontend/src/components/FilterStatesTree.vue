<script setup lang="ts">
	import { ref } from 'vue'

	import AddIcon from '~icons/ph/plus-circle-bold'
	import MaximizeIcon from '~icons/ph/caret-down-bold'
	import MinimizeIcon from '~icons/ph/caret-up-bold'
	import RemoveIcon from '~icons/ph/minus-circle-bold'

	import { groupUFsByRegion, listUFs } from '~/utils/entities'

	const model = defineModel<Set<string>>({ required: true })

	const showRegions = ref(false)
	const showStates = ref(false)

	const regions = groupUFsByRegion()
	const ufs = listUFs()

	function hasRegion (ufs: string[]) {
		return ufs.every((uf) => hasUF(uf))
	}

	function hasUF (uf: string) {
		return model.value.has(uf)
	}

	function removeUF (uf: string) {
		model.value.delete(uf)
	}

	function selectUF (uf: string) {
		model.value.add(uf)
	}

	function toggleRegion (ufs: string[]) {
		if (hasRegion(ufs)) {
			for (const uf of ufs) {
				removeUF(uf)
			}
		} else {
			for (const uf of ufs) {
				selectUF(uf)
			}
		}
	}

	function toggleUF (uf: string) {
		if (hasUF(uf)) {
			removeUF(uf)
		} else {
			selectUF(uf)
		}
	}
</script>

<template>
	<ul class="tags-tree">
		<li>
			<label>
				<input class="sr-only" type="checkbox" v-model="showRegions">
				<span>Regiões</span>
				<component class="arrow-icon" :is="showRegions ? MinimizeIcon : MaximizeIcon"/>
			</label>
			<ul class="level-1" v-if="showRegions">
				<li v-for="(ufs, label) of regions" :key="label">
					<label @click.prevent>
						<button type="button" :title="`${hasRegion(ufs) ? 'Não filtrar' : 'Filtrar'} por &quot;${label}&quot;`" @click="toggleRegion(ufs)">
							<component :is="hasRegion(ufs) ? RemoveIcon : AddIcon"/>
						</button>
						<span>{{ label }}</span>
					</label>
				</li>
			</ul>
		</li>
		<li>
			<div class="tree-row">
				<label>
					<input class="sr-only" type="checkbox" v-model="showStates">
					<span>Estados</span>
					<component class="arrow-icon":is="showStates ? MinimizeIcon : MaximizeIcon"/>
				</label>
			</div>
			<ul class="level-1" v-if="showStates">
				<li v-for="(label, uf) of ufs" :key="uf">
					<label @click.prevent>
						<button type="button" :title="`${hasUF(uf) ? 'Não filtrar' : 'Filtrar'} por &quot;${label}&quot;`" @click="toggleUF(uf)">
							<component :is="hasUF(uf) ? RemoveIcon : AddIcon"/>
						</button>
						<span>{{ label }}</span>
					</label>
				</li>
			</ul>
		</li>
	</ul>
</template>

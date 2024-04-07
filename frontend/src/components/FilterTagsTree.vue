<script setup lang="ts">
	import AddIcon from '~icons/ph/plus-circle-bold'
	import MaximizeIcon from '~icons/ph/caret-down-bold'
	import MinimizeIcon from '~icons/ph/caret-up-bold'
	import RemoveIcon from '~icons/ph/minus-circle-bold'

	import TagsTree from '~/components/TagsTree.vue'
	import type { Tag } from '~/utils/types'

	const model = defineModel<Set<number>>({ required: true })

	function hasTag (tag: Tag) {
		return model.value.has(tag.id)
	}

	function toggleTag (tag: Tag) {
		if (hasTag(tag)) {
			model.value.delete(tag.id)
		} else {
			model.value.add(tag.id)
		}
	}
</script>

<template>
	<TagsTree v-slot="{ tag, hasChildren, showChildren, toggleChildren }">
		<button type="button" :title="`${hasTag(tag) ? 'Não filtrar' : 'Filtrar'} por &quot;${tag.name}&quot;`" @click="toggleTag(tag)" v-if="tag.parent_id || !hasChildren">
			<component :is="hasTag(tag) ? RemoveIcon : AddIcon"/>
		</button>
		<label>
			<input class="sr-only" type="checkbox" :value="showChildren" @change="toggleChildren" v-if="hasChildren">
			<span>{{ tag.name }}</span>
			<component class="arrow-icon" :is="showChildren ? MinimizeIcon : MaximizeIcon" v-if="hasChildren"/>
		</label>
	</TagsTree>
</template>

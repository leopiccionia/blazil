import type { Tag, TagTree } from './types'

export function computeTagsMap (tags: Tag[]): Record<string, Tag> {
	const map: Record<string, Tag> = {}

	for (const tag of tags) {
		map[tag.id] = tag
	}

	return map
}

function computeTagsSubtree (tag: Tag, groups: Record<string, Tag[]>): TagTree {
	let children = null
	if (groups[tag.id]) {
		children = groups[tag.id].sort(sortTags).map((child) => computeTagsSubtree(child, groups))
	}

	return { id: tag.id, name: tag.name, children }
}

export function computeTagsTree (tags: Tag[]): TagTree[] {
	// @ts-ignore
	const groups: Record<string, Tag[]> = Object.groupBy(tags, (tag) => tag.parent_id ?? 0)

	const rootTags = groups[0] ?? []

	return rootTags.sort(sortTags).map((tag) => computeTagsSubtree(tag, groups))
}

export function sortTags (a: Tag, b: Tag): number {
	return (a.name).localeCompare(b.name)
}

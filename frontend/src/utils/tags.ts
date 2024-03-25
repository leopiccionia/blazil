import type { Tag, TagNode } from '~/utils/types'

export function computeTagsList (tags: Tag[]): Tag[] {
	return tags.sort(sortTags)
}

export function computeTagsMap (tags: Tag[]): Record<string, Tag> {
	const map: Record<string, Tag> = {}

	for (const tag of tags) {
		map[tag.id] = tag
	}

	return map
}

function computeTagsSubtree (tag: Tag, groups: Record<string, Tag[]>): TagNode {
	let children = null
	if (groups[tag.id]) {
		children = groups[tag.id].sort(sortTags).map((child) => computeTagsSubtree(child, groups))
	}

	return { tag, children }
}

export function computeTagsTree (tags: Tag[]): TagNode[] {
	// @ts-ignore
	const groups: Record<string, Tag[]> = Object.groupBy(tags, (tag) => tag.parent_id ?? 0)

	const rootTags = groups[0] ?? []

	return rootTags.sort(sortTags).map((tag) => computeTagsSubtree(tag, groups))
}

export function sortTags (a: Tag, b: Tag): number {
	return (a.name).localeCompare(b.name)
}

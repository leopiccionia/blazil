import type { Tag, TagNode } from '~/utils/types'

export function compareTagIds (tagsMap: Record<string, Tag>) {
	return function (a: number, b: number): number {
		return compareTags(tagsMap[a], tagsMap[b])
	}
}

export function compareTags (a: Tag, b: Tag): number {
	return (a.name).localeCompare(b.name)
}

export function computeTagsList (tags: Tag[]): Tag[] {
	return tags.sort(compareTags)
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
		children = groups[tag.id].sort(compareTags).map((child) => computeTagsSubtree(child, groups))
	}

	return { tag, children }
}

export function computeTagsTree (tags: Tag[]): TagNode[] {
	// @ts-ignore
	const groups: Record<string, Tag[]> = Object.groupBy(tags, (tag) => tag.parent_id ?? 0)

	const rootTags = groups[0] ?? []

	return rootTags.sort(compareTags).map((tag) => computeTagsSubtree(tag, groups))
}

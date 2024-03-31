import { sortObject } from '~/utils/objects'
import type { EntityTag, Tag } from '~/utils/types'

type LabeledTag = {
	label: string,
	entityTag: EntityTag,
}

function compareLabeledTags (a: LabeledTag, b: LabeledTag): number {
	return (a.label).localeCompare(b.label)
}

export function groupEntityTags (entityTags: EntityTag[], tagsMap: Record<string, Tag>): Record<string, LabeledTag[]> {
	const groups: Record<string, LabeledTag[]> = {}

	for (const entityTag of entityTags) {
		let tag = tagsMap[entityTag.tag_id]
		const label = tag.name

		while (tag.parent_id) {
			tag = tagsMap[tag.parent_id]
		}

		const rootLabel = tag.name

		if (groups[rootLabel]) {
			groups[rootLabel].push({ label, entityTag })
		} else {
			groups[rootLabel] = [{ label, entityTag }]
		}
	}

	for (const tags of Object.values(groups)) {
		tags.sort(compareLabeledTags)
	}

	return sortObject(groups)
}

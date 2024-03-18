import type { EntityTag, Tag } from '~/utils/types'

type LabeledTag = {
	label: string,
	entityTag: EntityTag,
}

export function listEntityTags (entityTags: EntityTag[], tagsMap: Record<string, Tag>): LabeledTag[] {
	const labeledTags: LabeledTag[] = []

	for (const entityTag of entityTags) {
		let tag = tagsMap[entityTag.tag_id]
		let label = tag.name

		while (tag.parent_id) {
			tag = tagsMap[tag.parent_id]
			label = `${tag.name} › ${label}`
		}

		labeledTags.push({ label, entityTag })
	}

	return labeledTags.sort(sortLabeledTags)
}

function sortLabeledTags (a: LabeledTag, b: LabeledTag): number {
	return (a.label).localeCompare(b.label)
}

export type EntityType = 'pais' | 'estado' | 'municipio' | 'distrito_federal' | 'distrito_estadual' | 'regiao_administrativa' | 'vila'

export type Entity = {
	id: number,
	name: string,
	image: string | null,
	type: EntityType,
	uf: string | null,
}

export type EntityTag = {
	id: number,
	entity_id: number,
	tag_id: number,
}

export type Tag = {
	id: number,
	name: string,
	parent_id: number | null,
}

// For infinite queries
export type Paginated<Data> = {
	data: Data[],
	count: number,
	page: number,
}

// For dynamically-computed tag trees
export type TagTree = {
	id: number,
	name: string,
	children: TagTree[] | null,
}

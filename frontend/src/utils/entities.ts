import type { Entity } from './types'

export function formatEntityName (entity: Entity) {
	if (['pais', 'estado', 'distrito_federal'].includes(entity.type)) {
		return entity.name
	} else {
		return `${entity.name} (${entity.uf})`
	}
}

export function formatEntityType (entity: Entity) {
	switch (entity.type) {
		case 'distrito_estadual':
			return 'Distrito Estadual'
		case 'distrito_federal':
			return 'Distrito Federal'
		case 'estado':
			return 'Estado'
		case 'municipio':
			return 'Município'
		case 'pais':
			return 'País'
		case 'regiao_administrativa':
			return 'Região Administrativa'
		case 'vila':
			return 'Vila'
	}
}

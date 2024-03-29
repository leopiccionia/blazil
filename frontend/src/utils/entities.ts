import type { Entity } from '~/utils/types'

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

export function groupUFsByRegion () {
	return {
		'Centro-Oeste': ['DF', 'GO', 'MS', 'MT'],
		'Nordeste': ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
		'Norte': ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'],
		'Sudeste': ['ES', 'MG', 'RJ', 'SP'],
		'Sul': ['PR', 'RS', 'SC'],
	}
}

export function listUFs (): Record<string, string> {
	return {
		AC: 'Acre',
		AL: 'Alagoas',
		AP: 'Amapá',
		AM: 'Amazonas',
		BA: 'Bahia',
		CE: 'Ceará',
		DF: 'Distrito Federal',
		ES: 'Espírito Santo',
		GO: 'Goiás',
		MA: 'Maranhão',
		MT: 'Mato Grosso',
		MS: 'Mato Grosso do Sul',
		MG: 'Minas Gerais',
		PA: 'Pará',
		PB: 'Paraíba',
		PR: 'Paraná',
		PE: 'Pernambuco',
		PI: 'Piauí',
		RJ: 'Rio de Janeiro',
		RN: 'Rio Grande do Norte',
		RS: 'Rio Grande do Sul',
		RO: 'Rondônia',
		RR: 'Roraima',
		SC: 'Santa Catarina',
		SP: 'São Paulo',
		SE: 'Sergipe',
		TO: 'Tocantins',
	}
}

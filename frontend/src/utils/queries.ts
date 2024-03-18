import type { Paginated } from './types'

export function infiniteQueryResult<Data, Error> (data: Data[] | null, error: Error | null, page: number): Promise<Paginated<Data>> {
	if (error) {
		return Promise.reject(error)
	} else {
		return Promise.resolve({
			data: data!,
			count: data!.length,
			page,
		})
	}
}

export function queryResult<Data, Error> (data: Data | null, error: Error | null): Promise<Data> {
	if (error) {
		return Promise.reject(error)
	} else {
		return Promise.resolve(data!)
	}
}

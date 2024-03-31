function compareEntries (a: [string, unknown], b: [string, unknown]): number {
	return a[0].localeCompare(b[0])
}

export function sortObject<T> (obj: Record<string, T>): Record<string, T> {
	return Object.fromEntries(Object.entries(obj).sort(compareEntries))
}

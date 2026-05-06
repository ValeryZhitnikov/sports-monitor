export async function fetchJSON<T>(url: string, headers?: {}): Promise<T> {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`HTTP ${res.status}: ${res.statusText}`);
	}

	return res.json() as Promise<T>;
}

import { fetchJSON } from "@/src/infrastructure/http/fetch-json";
import { Result } from "@/src/core/domain/utils/result";

export class FootballApiClient {
	private apiUrl = process.env.NEXT_PUBLIC_FOOTBALL_API_HOST;
	private headers = {
		Authorization: `ApiKey ${this.apiUrl}`,
		"Content-Type": "application/json",
	};
	private buildUrl(url: string): string {
		const apiUrl = process.env.NEXT_PUBLIC_FOOTBALL_API_HOST;
		return `${apiUrl}/${url}`;
	}

	async get<T>(url: string): Promise<Result<T>> {
		const fullUrl = this.buildUrl(url);

		try {
			const data = await fetchJSON<T>(fullUrl, this.headers);
			return Result.success(data);
		} catch (e) {
			return Result.failure("Football API request failed");
		}
	}
}

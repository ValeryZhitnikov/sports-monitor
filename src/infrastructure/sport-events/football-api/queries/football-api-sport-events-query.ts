import { Result } from "@/src/core/domain/utils/result";
import { FootballApiClient } from "@/src/infrastructure/sport-events/football-api/http/football-api-client";
import { FootballApiEventsResponseDto } from "@/src/infrastructure/sport-events/football-api/dto/football-api-dto";
import { SportEventsQuery } from "@/src/core/domain/ports/sport-events-query";
import { SportEvent } from "@/src/core/domain/models/sport-event";
import { footballApiEventsMapper } from "../mappers/sport-event.mapper";
import { EventsFilter, EventsFilterQuery } from "@/src/core/domain/types/events-filter";

export class FootballApiSportEventsQuery implements SportEventsQuery {
	constructor(private client = new FootballApiClient()) {}

	private formatDate(date: Date): string {
		const dateFormated = [
			date.getFullYear(),
			String(date.getMonth() + 1).padStart(2, "0"),
			String(date.getDate()).padStart(2, "0"),
		].join("-");

		return dateFormated;
	}

	private async getEvents(url: string): Promise<Result<SportEvent[]>> {
		const response = await this.client.get<FootballApiEventsResponseDto>(url);
		if (!response.isSuccess()) {
			return Result.failure(response.getError()!);
		}

		const data = response.getValue()?.data ?? [];

		return Result.success(footballApiEventsMapper(data));
	}

	private deduplicateEvents(events: SportEvent[]): SportEvent[] {
		const map = new Map<string, SportEvent>();

		for (const event of events) {
			map.set(event.id, event);
		}

		return Array.from(map.values());
	}

	async getEventsForDay(date: Date, filter?: EventsFilterQuery): Promise<Result<SportEvent[]>> {
		const dateFormatted = this.formatDate(date);

		const requests: Promise<Result<SportEvent[]>>[] = [];

		// 1️⃣ По участникам
		if (filter?.participants?.length) {
			const participantsIds = filter.participants.join(",");
			requests.push(this.getEvents(`games/list?date=${dateFormatted}&team=${participantsIds}`));
		}

		// 2️⃣ По событиям
		if (filter?.events?.length) {
			const eventsIds = filter.events.join(",");
			requests.push(this.getEvents(`games/list?date=${dateFormatted}&id=${eventsIds}`));
		}

		// 3️⃣ Если нет фильтра — просто все события дня
		if (requests.length === 0) {
			return this.getEvents(`games/list?date=${dateFormatted}`);
		}

		// 4️⃣ Выполняем все запросы
		const results = await Promise.all(requests);

		// 5️⃣ Проверка ошибок
		const failed = results.find((r) => !r.isSuccess());
		if (failed) {
			return Result.failure(failed.getError()!);
		}

		// 6️⃣ Объединяем результаты
		const allEvents = results.flatMap((r) => r.getValue() || []);

		// 7️⃣ Убираем дубликаты
		const uniqueEvents = this.deduplicateEvents(allEvents);

		return Result.success(uniqueEvents);
	}

	async getEventsInRange(from: Date, to: Date, participants?: string[]): Promise<Result<SportEvent[]>> {
		return Result.failure("An unknown error occurred during retrieval");
	}

	async getEventsForTournament(tournamentId: string): Promise<Result<SportEvent[]>> {
		return this.getEvents(`games/list?leagueid=${tournamentId}&upcoming=true`);
	}

	async getEventsForParticipant(participantId: string): Promise<Result<SportEvent[]>> {
		return this.getEvents(`games/list?&team=${participantId}&upcoming=true`);
	}
}

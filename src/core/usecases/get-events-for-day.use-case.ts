import { SportEvent } from "@/src/core/domain/models/sport-event";
import type { SportType } from "@/src/core/domain/models/participant";
import type { SportEventsQuery } from "@/src/core/domain/ports/sport-events-query";
import { Result } from "@/src/core/domain/utils/result";
import { SportItem } from "@/src/core/domain/types/sport-item";
import { EventsFilter, EventsFilterQuery } from "@/src/core/domain/types/events-filter";

type SportEventsQueryFactory = (sportType: SportType) => SportEventsQuery;

export class GetEventsForDayUseCase {
	constructor(
		private readonly getQueryForSport: SportEventsQueryFactory,
		private readonly aggregatedQuery: SportEventsQuery // используется только для "всех событий"
	) {}

	async execute(day: Date, filter?: EventsFilter): Promise<Result<SportEvent[]>> {
		if (!filter || this.isFilterEmpty(filter)) {
			return this.aggregatedQuery.getEventsForDay(day);
		}

		// Группируем по виду спорта
		const grouped = this.groupBySport(filter);

		if (!grouped) {
			return Result.success([]); // или можно вернуть Result.failure("Empty filter") в зависимости от требований
		}

		// Делаем запросы только к нужным адаптерам
		const results = await Promise.all(
			Object.entries(grouped).map(([sportType, filter]) =>
				this.getQueryForSport(sportType as SportType).getEventsForDay(day, filter as EventsFilterQuery)
			)
		);

		// Склеиваем результаты
		const mergedEvents = results.flatMap((r) => r.getValue() ?? []);

		return Result.success(mergedEvents);
	}

	// ======================
	// Private helpers
	// ======================

	private isFilterEmpty(filter: EventsFilter): boolean {
		return (
			(!filter.participants || filter.participants.length === 0) &&
			(!filter.events || filter.events.length === 0) &&
			(!filter.tournaments || filter.tournaments.length === 0)
		);
	}

	private groupBySport(filter: EventsFilter): Record<SportType, EventsFilterQuery> | null {
		if (this.isFilterEmpty(filter)) {
			return null;
		}

		const grouped: Record<SportType, EventsFilterQuery> = {} as Record<SportType, EventsFilterQuery>;

		for (const group in filter) {
			const items = filter[group as keyof EventsFilter] as SportItem[] | undefined;

			for (const item of items ?? []) {
				if (!grouped[item.sportType]) {
					grouped[item.sportType] = {};
				}

				if (!grouped[item.sportType][group as keyof EventsFilterQuery]) {
					grouped[item.sportType][group as keyof EventsFilterQuery] = [];
				}

				grouped[item.sportType][group as keyof EventsFilterQuery]!.push(item.id);
			}
		}

		return grouped;
	}
}

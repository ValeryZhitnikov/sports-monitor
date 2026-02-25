import { SportEvent } from "@/src/core/domain/models/sport-event";
import type { FavoritesRepository } from "@/src/core/domain/ports/favorites-repository";
import type { SportEventsQuery } from "@/src/core/domain/ports/sport-events-query";
import { Result } from "@/src/core/domain/utils/result";

export type DayEventScope = 'all' | 'favorites';

export class GetEventsForDayUseCase {
    constructor(
        private readonly sportEventsQuery: SportEventsQuery,
        private readonly favoritesRepository: FavoritesRepository
    ) {}

    async execute(
        day: Date,
        scope: DayEventScope,
        userId?: string
    ): Promise<Result<SportEvent[]>> {
        switch (scope) {
            case 'favorites':
                const favorites = await this.favoritesRepository?.getFavoritesParticipants(userId);
                const ids = ['529']
                return this.sportEventsQuery.getEventsForDay(day, ids);
            case 'all': 
                return this.sportEventsQuery.getEventsForDay(day);
        }
    }
}
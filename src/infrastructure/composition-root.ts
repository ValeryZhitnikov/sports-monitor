import type { SportType } from "@/src/core/domain/models/participant";
import { GetEventsForDayUseCase } from "@/src/core/usecases/get-events-for-day.use-case";
import { LocalStorageFavoritesRepository } from "@/src/infrastructure/favorites/local-storage-favorites-repository";
import { AggregatedSportEventsQuery } from "@/src/infrastructure/sport-events/aggregated-sport-events-query";
import { FootballApiSportEventsQuery } from "@/src/infrastructure/sport-events/football-api/queries/football-api-sport-events-query";
import { type AdaptersListType, sportEventsQueryRouter } from "@/src/infrastructure/sport-events/sport-events-query-router";

const adapters: AdaptersListType = {
    "football": FootballApiSportEventsQuery
}

export const createSportEventsQuery = (sportType?: SportType) => {
    if ( sportType ) {
        return sportEventsQueryRouter(adapters, sportType);
    }
    
    return new AggregatedSportEventsQuery(
        Object.values(adapters).map(AdapterClass => new AdapterClass())
    );
}

export const createFavoritesRepository = () => {
  return new LocalStorageFavoritesRepository();
};

export const createGetEventsForDayUseCase = (
    sportType?: SportType
) => {
    return new GetEventsForDayUseCase(
        createSportEventsQuery(sportType),
        createFavoritesRepository()
    );
}
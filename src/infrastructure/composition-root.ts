import type { SportType } from "@/src/core/domain/models/participant";
import { GetEventsForDayUseCase } from "@/src/core/usecases/get-events-for-day.use-case";
import { AggregatedSportEventsQuery } from "@/src/infrastructure/sport-events/aggregated-sport-events-query";
import { FootballApiSportEventsQuery } from "@/src/infrastructure/sport-events/football-api/queries/football-api-sport-events-query";
import { FootballApiParticipantQuery } from "@/src/infrastructure/sport-events/football-api/queries/football-api-participants-query";
import {
	type AdaptersListType,
	sportEventsQueryRouter,
} from "@/src/infrastructure/sport-events/sport-events-query-router";
import {
	type ParticipantAdaptersListType,
	participantsQueryRouter,
} from "@/src/infrastructure/sport-events/participants-query-router";

const sportEventsAdapters: AdaptersListType = {
	football: FootballApiSportEventsQuery,
};

const participantAdapters: ParticipantAdaptersListType = {
	football: FootballApiParticipantQuery,
};

export const createSportEventsQuery = (sportType?: SportType) => {
	if (sportType) {
		return sportEventsQueryRouter(sportEventsAdapters, sportType);
	}

	return new AggregatedSportEventsQuery(Object.values(sportEventsAdapters).map((AdapterClass) => new AdapterClass()));
};

export const createParticipantQuery = (sportType: SportType) => {
	return participantsQueryRouter(participantAdapters, sportType);
};

export const createGetEventsForDayUseCase = () => {
	const aggregatedQuery = new AggregatedSportEventsQuery(
		Object.values(sportEventsAdapters).map((AdapterClass) => new AdapterClass())
	);

	const factory = (sportType: SportType) => sportEventsQueryRouter(sportEventsAdapters, sportType);

	return new GetEventsForDayUseCase(factory, aggregatedQuery);
};

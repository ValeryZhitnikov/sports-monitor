import type { SportEvent } from "@/src/core/domain/models/sport-event";
import type { FootballApiMatchDto } from "../dto/football-api-dto";
import { footballApiParticipantMapper } from "./participant.mapper";

export const footballApiEventsMapper = (events: FootballApiMatchDto[]): SportEvent[] => {
	return events.map((event) => {
		return {
			id: event.id.toString(),
			sportType: "football",
			dateAt: event.date,
			tournament: {
				name: event.season.league.name,
				id: event.season.league.id.toString(),
			},
			participants: [footballApiParticipantMapper(event.homeTeam), footballApiParticipantMapper(event.awayTeam)],
		};
	});
};

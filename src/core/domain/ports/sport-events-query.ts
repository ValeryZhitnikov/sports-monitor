import { Result } from "@/src/core/domain/utils/result";
import type { SportEvent } from "@/src/core/domain/models/sport-event";
import type { EventsFilterQuery } from "@/src/core/domain/types/events-filter";

export interface SportEventsQuery {
	getEventsForDay(date: Date, filter?: EventsFilterQuery): Promise<Result<SportEvent[]>>;
	getEventsInRange(from: Date, to: Date, participants?: string[]): Promise<Result<SportEvent[]>>;
	getEventsForTournament(tournamentId: string): Promise<Result<SportEvent[]>>;
	getEventsForParticipant(participantId: string): Promise<Result<SportEvent[]>>;
}

import { Result } from "@/src/core/domain/utils/result";
import { SportEvent } from "@/src/core/domain/models/sport-event";

export interface SportEventsQuery {
  getEventsForDay(date: Date): Promise<Result<SportEvent[]>>;
  getEventsInRange(from: Date, to: Date): Promise<Result<SportEvent[]>>;
  getEventsForTournament(tournamentId: string): Promise<Result<SportEvent[]>>;
  getEventsForParticipant(participantId: string): Promise<Result<SportEvent[]>>;
}
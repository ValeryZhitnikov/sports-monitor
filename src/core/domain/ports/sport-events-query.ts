import { Result } from "@/src/core/domain/utils/result";
import { SportEvent } from "@/src/core/domain/models/sport-event";

export interface SportEventsQuery {
  getEventsForDay(date: Date, participants?: string[]): Promise<Result<SportEvent[]>>;
  getEventsInRange(from: Date, to: Date, participants?: string[]): Promise<Result<SportEvent[]>>;
  getEventsForTournament(tournamentId: string): Promise<Result<SportEvent[]>>;
  getEventsForParticipant(participantId: string): Promise<Result<SportEvent[]>>;
}
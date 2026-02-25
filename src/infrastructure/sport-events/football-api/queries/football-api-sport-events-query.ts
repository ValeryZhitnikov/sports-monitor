import { Result } from "@/src/core/domain/utils/result";
import { FootballApiClient } from "@/src/infrastructure/sport-events/football-api/http/football-api-client";
import { FootballApiEventsResponseDto } from "@/src/infrastructure/sport-events/football-api/dto/football-api-dto";
import { SportEventsQuery } from "@/src/core/domain/ports/sport-events-query";
import { SportEvent } from "@/src/core/domain/models/sport-event";
import { footballApiEventsMapper } from "../mappers/sport-event.mapper";

export class FootballApiSportEventsQuery implements SportEventsQuery {
  constructor(private client = new FootballApiClient()) { }

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

  async getEventsForDay(date: Date, participants?: string[]): Promise<Result<SportEvent[]>> {
    const dateFormated = this.formatDate(date);
    const participantsIds = participants && participants?.length > 0 
    ? `&team=${participants.join(',')}`
    : '';

    return this.getEvents(`games/list?date=${dateFormated}${participantsIds}`);
  };

  async getEventsInRange(from: Date, to: Date, participants?: string[]): Promise<Result<SportEvent[]>> {
    return Result.failure('An unknown error occurred during retrieval');
  };

  async getEventsForTournament(tournamentId: string): Promise<Result<SportEvent[]>> {
    return this.getEvents(`games/list?leagueid=${tournamentId}&upcoming=true`);
  };

  async getEventsForParticipant(participantId: string): Promise<Result<SportEvent[]>> {
    return this.getEvents(`games/list?&team=${participantId}&upcoming=true`);
  };
}
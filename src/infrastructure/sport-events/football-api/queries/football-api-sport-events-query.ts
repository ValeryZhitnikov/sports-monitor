import slugify from "slugify";
import { Result } from "@/src/core/domain/utils/result";
import { fetchJSON } from "@/src/infrastructure/http/fetch-json";
import { FootballApiResponseDto, FootballApiMatchDto, FootballApiTeamDto } from "@/src/infrastructure/sport-events/football-api/dto/football-api-dto";
import { SportEventsQuery } from "@/src/core/domain/ports/sport-events-query";
import { SportEvent } from "@/src/core/domain/models/sport-event";
import { Participant } from "@/src/core/domain/models/participant";

export class FootballApiSportEventsQuery implements SportEventsQuery {
  async getEventsForDay(date: Date): Promise<Result<SportEvent[]>> {
    const dateFormated = this.formatDate(date);
    const url = this.buildUrl(`games/list?date=${dateFormated}&team=529`);
    
    try {
      const response = await fetchJSON<FootballApiResponseDto>(url);
      if (!response.data || response.data.length === 0) {
        return Result.success([]);
      }

      const result = this.eventsMapper(response.data);
      return Result.success(result);
    } catch (e) {
      return Result.failure('An unknown error occurred during retrieval');
    }
    
  };
  async getEventsInRange(from: Date, to: Date): Promise<Result<SportEvent[]>> {
    return Result.failure('An unknown error occurred during retrieval');
  };
  async getEventsForTournament(tournamentId: string): Promise<Result<SportEvent[]>> {
    return Result.failure('An unknown error occurred during retrieval');
  };
  async getEventsForParticipant(participantId: string): Promise<Result<SportEvent[]>> {
    return Result.failure('An unknown error occurred during retrieval');
  };

  private buildUrl(url: string): string {
    const apiUrl = process.env.NEXT_PUBLIC_FOOTBALL_API_HOST;
    return `${apiUrl}/${url}`;
  }

  private formatDate(date: Date): string {
    const dateFormated = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    return dateFormated;
  }

  private slugifyName(name: string): string {
    return slugify(name, {
      replacement: '-',
      lower: true,
    });
  }

  private mapParticipant(participant: FootballApiTeamDto): Participant {
    return {
      id: participant.id.toString(),
      sportType: "football",
      name: participant.name,
      slug: this.slugifyName(participant.name),
      logo: participant.logoUrl,
    }
  }

  private eventsMapper(events: FootballApiMatchDto[]): SportEvent[] {
    return events.map(event => {
      return {
        id: event.id.toString(),
        sportType: "football",
        dateAt: event.date,
        tournament: event.season.league.id.toString(),
        participants: [
          this.mapParticipant(event.homeTeam),
          this.mapParticipant(event.awayTeam),
        ],
      }
    })
  }
}
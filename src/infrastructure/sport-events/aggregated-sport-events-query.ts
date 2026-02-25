import { Result } from "@/src/core/domain/utils/result";
import { SportEventsQuery } from "@/src/core/domain/ports/sport-events-query";
import { SportEvent } from "@/src/core/domain/models/sport-event";

export class AggregatedSportEventsQuery implements SportEventsQuery {
  constructor(
    private readonly sources: SportEventsQuery[]
  ) {}

  async getEventsForDay(date: Date, participants?: string[]): Promise<Result<SportEvent[]>> {
    return this.merge(
      this.sources.map(s => s.getEventsForDay(date, participants))
    );
  }

  async getEventsInRange(from: Date, to: Date, participants?: string[]): Promise<Result<SportEvent[]>> {
    return this.merge(
      this.sources.map(s => s.getEventsInRange(from, to, participants))
    );
  }

  async getEventsForTournament(tournamentId: string): Promise<Result<SportEvent[]>> {
    return this.merge(
      this.sources.map(s => s.getEventsForTournament(tournamentId))
    );
  }

  async getEventsForParticipant(participantId: string): Promise<Result<SportEvent[]>> {
    return this.merge(
      this.sources.map(s => s.getEventsForParticipant(participantId))
    );
  }

  private async merge(
    promises: Promise<Result<SportEvent[]>>[]
  ): Promise<Result<SportEvent[]>> {
    const results = await Promise.all(promises);

    const errors = results.filter(r => !r.isSuccess());
    if (errors.length === results.length) {
      return Result.failure(
        errors.map(e => e.getError()).join("; ")
      );
    }

    const events = results
      .filter(r => r.isSuccess())
      .flatMap(r => r.getValue() ?? []);

    return Result.success(events);
  }
}

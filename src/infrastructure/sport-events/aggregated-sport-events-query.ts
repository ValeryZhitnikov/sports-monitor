import { SportEventsQuery } from "@/src/core/domain/ports/sport-events-query";
import { SportEvent } from "@/src/core/domain/models/sport-event";
import { Result } from "@/src/core/domain/utils/result";

export class AggregatedSportEventsQuery implements SportEventsQuery {
  constructor (
    private readonly sources: SportEventsQuery[]
  ) {}

  async getEventsForDay(date: Date): Promise<Result<SportEvent[]>> {
    const result = await Promise.all(
      this.sources.map(source => source.getEventsForDay(date))
    );
  }
}
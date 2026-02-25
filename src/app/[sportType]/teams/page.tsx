import type { ParticipantQueryCriteria } from "@/src/core/domain/ports/participants-query";

import { FootballApiParticipantQuery } from "@/src/infrastructure/sport-events/football-api/queries/football-api-participants-query";
import { ParticipantsList } from "@/src/app/components/ParticipantsList";

export default async function Teams() {
  const criteria: ParticipantQueryCriteria = {
    limit: 50,
    country: 'Spain' 
  }
  const footballApiParticipantQuery = new FootballApiParticipantQuery();
  const teams = await footballApiParticipantQuery.getMany(criteria);
  const value = teams.getValue() || [];

  return (
    <>
      <ParticipantsList participants={value} />
    </>
  );
}

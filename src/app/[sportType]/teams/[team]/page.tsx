import type { SportType } from "@/src/core/domain/models/participant";

import { EventsList } from "@/src/app/components/EventsList";
import { createSportEventsQuery } from "@/src/infrastructure/composition-root";

type Props = { params: Promise<{ sportType: SportType; team: string }> };

export default async function TeamPage({ params }: Props) {
  const { sportType, team } = await params;
  const query = createSportEventsQuery(sportType);
  const events = await query.getEventsForParticipant(team);
  const value = events.getValue() || [];

  return (
    <>
      <EventsList events={value} />
    </>
  );
}

import { EventsList } from "@/src/app/components/EventsList";
import { createSportEventsQuery } from "@/src/infrastructure/composition-root";

type Props = { params: Promise<{ tournament: string }> };

export default async function TournamentPage({ params }: Props) {
  const { tournament } = await params;

  const query = createSportEventsQuery();
  const events = await query.getEventsForTournament(tournament);
  const value = events.getValue() || [];

  return (
    <>
      <EventsList events={value} />
    </>
  );
}

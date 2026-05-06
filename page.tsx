import type { SportType } from '@/src/core/domain/models/participant';

import { EventsList } from '@/src/app/components/EventsList';
import { ParticipantCard } from '@/src/app/components/ui/ParticipantCard';
import { createParticipantQuery } from '@/src/infrastructure/composition-root';
import { createSportEventsQuery } from '@/src/infrastructure/composition-root';

type Props = { params: Promise<{ sportType: SportType; id: string }> };

export default async function TeamPage({ params }: Props) {
const { sportType, id } = await params;

const participantQuery = createParticipantQuery(sportType);
const participant = await participantQuery.getById(id);

const sportEventsQuery = createSportEventsQuery(sportType);
const events = await sportEventsQuery.getEventsForParticipant(id);

return (
<div>
{participant.getValue() && <ParticipantCard participant={participant.getValue()!} path={//teams/} />}
<EventsList events={events.getValue() || []} />
</div>
);
}
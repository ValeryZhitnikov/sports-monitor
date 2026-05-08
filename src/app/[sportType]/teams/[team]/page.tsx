import type { SportType } from "@/src/core/domain/models/participant";

import { EventsList } from "@/src/app/components/EventsList";
import { ParticipantCard } from "@/src/app/components/ui/ParticipantCard";
import { createParticipantQuery } from "@/src/infrastructure/composition-root";
import { createSportEventsQuery } from "@/src/infrastructure/composition-root";
import { Container } from "@/src/app/components/layout/Container";

import classes from "./team.module.scss";

type Props = { params: Promise<{ sportType: SportType; team: string }> };

export default async function TeamPage({ params }: Props) {
	const { sportType, team } = await params;

	const participantQuery = createParticipantQuery(sportType);
	const participant = await participantQuery.getById(team);

	const sportEventsQuery = createSportEventsQuery(sportType);
	const events = await sportEventsQuery.getEventsForParticipant(team);

	return (
		<>
			<Container className={classes.title}>
				{participant.getValue() && (
					<ParticipantCard participant={participant.getValue()!} path={`/${sportType}/teams/`} />
				)}
			</Container>
			<EventsList events={events.getValue() || []} />
		</>
	);
}

import type { ParticipantQueryCriteria } from "@/src/core/domain/ports/participants-query";
import type { SportType } from "@/src/core/domain/models/participant";

import { ParticipantsList } from "@/src/app/components/ParticipantsList";
import { createParticipantQuery } from "@/src/infrastructure/composition-root";

type Props = { params: Promise<{ sportType: SportType; country: string }> };

export default async function CountryTeamsPage({ params }: Props) {
	const { sportType, country } = await params;

	const criteria: ParticipantQueryCriteria = {
		limit: 50,
		country: decodeURIComponent(country).charAt(0).toUpperCase() + decodeURIComponent(country).slice(1),
	};

	const participantQuery = createParticipantQuery(sportType);
	const teams = await participantQuery.getMany(criteria);
	const value = teams.getValue() || [];

	return (
		<>
			<ParticipantsList participants={value} path={`/${sportType}/teams/`} sportType={sportType} />
		</>
	);
}
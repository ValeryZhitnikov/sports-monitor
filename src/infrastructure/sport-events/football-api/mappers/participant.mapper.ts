import slugify from "slugify";
import type { Participant } from "@/src/core/domain/models/participant";
import type { FootballApiTeamDto } from "../dto/football-api-dto";
import { slugifyName } from "@/src/core/domain/utils/slugify-name";

export const footballApiParticipantMapper = (participant: FootballApiTeamDto): Participant => {
	return {
		id: participant.id.toString(),
		sportType: "football",
		name: participant.name,
		slug: slugifyName(participant.name),
		logo: participant.logoUrl,
	};
};

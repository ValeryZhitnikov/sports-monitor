import { SportType, Participant } from "@/src/core/domain/models/participant";

export interface SportEvent {
	id: string;
	sportType: SportType;
	dateAt: string | null;
	tournament: {
		name: string;
		id: string;
	};
	participants: Participant[];
}

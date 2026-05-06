import type { SportType } from "@/src/core/domain/models/participant";
import { ParticipantQuery } from "@/src/core/domain/ports/participants-query";

export type ParticipantQueryConstructor = new () => ParticipantQuery;
export type ParticipantAdaptersListType = Partial<Record<SportType, ParticipantQueryConstructor>>;

export const participantsQueryRouter = (adapters: ParticipantAdaptersListType, type: SportType): ParticipantQuery => {
	const AdapterClass = adapters[type];
	if (!AdapterClass) {
		throw new Error(`No adapter found for sport type '${type}'`);
	}
	return new AdapterClass();
};

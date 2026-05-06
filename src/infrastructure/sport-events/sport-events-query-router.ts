import type { SportType } from "@/src/core/domain/models/participant";
import { SportEventsQuery } from "@/src/core/domain/ports/sport-events-query";

export type SportEventsQueryConstructor = new () => SportEventsQuery;
export type AdaptersListType = Partial<Record<SportType, SportEventsQueryConstructor>>;

export const sportEventsQueryRouter = (adapters: AdaptersListType, type: SportType): SportEventsQuery => {
	const AdapterClass = adapters[type];
	if (!AdapterClass) {
		throw new Error(`No adapter found for sport type "${type}"`);
	}
	return new AdapterClass();
};

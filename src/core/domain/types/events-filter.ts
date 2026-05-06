import type { SportItem } from "@/src/core/domain/types/sport-item";

export type EventsFilter = {
	participants?: SportItem[];
	tournaments?: SportItem[];
	events?: SportItem[];
};

export type EventsFilterQuery = {
	participants?: string[];
	tournaments?: string[];
	events?: string[];
};

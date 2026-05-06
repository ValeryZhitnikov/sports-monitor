import type { SportType } from "@/src/core/domain/models/participant";

export interface SportItem {
	id: string;
	sportType: SportType;
}

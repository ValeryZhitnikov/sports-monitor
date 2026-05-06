import type { SportItem } from "@/src/core/domain/types/sport-item";

export interface FavoriteParticipant extends SportItem {
    name: string;
}

export interface FavoriteEvent extends SportItem {
    // participants: FavoriteParticipant[]; 
    // tournament: { id: string; name: string };
    // dateAt: string;
}

// На будущее
export interface FavoriteTournament extends SportItem {}

export interface FavoritesRepository {
	getFavoritesParticipants(userId?: string): Promise<FavoriteParticipant[]>;
	getFavoriteEvent(userId?: string): Promise<FavoriteEvent[]>;
	toggleFavoriteParticipant(participant: FavoriteParticipant, userId?: string): Promise<void>;
	toggleFavoriteEvent(event: FavoriteEvent, userId?: string): Promise<void>;
}

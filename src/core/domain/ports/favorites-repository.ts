import { SportType } from "@/src/core/domain/models/participant";

export interface FavoriteParticipant {
  id: string;
  sportType: SportType;
}

export interface FavoriteEvent {
  id: string;
  sportType: SportType;
}

export interface FavoritesRepository {
  getFavoritesParticipants(userId?: string): Promise<FavoriteParticipant[]>;
  getFavoriteEvent(userId?: string): Promise<FavoriteEvent[]>;
  toggleFavoriteParticipant(participant: FavoriteParticipant, userId?: string): Promise<void>;
  toggleFavoriteEvent(event: FavoriteEvent, userId?: string): Promise<void>;
}
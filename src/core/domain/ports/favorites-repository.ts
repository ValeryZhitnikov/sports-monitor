export interface FavoritesRepository {
  getFavoritesParticipantsIds(userId: string): Promise<string[]>;
  getFavoriteEventIds(userId: string): Promise<string[]>;
  toggleFavoriteParticipant(userId: string, participantId: string): Promise<void>;
  toggleFavoriteEvent(userId: string, eventId: string): Promise<void>;
}
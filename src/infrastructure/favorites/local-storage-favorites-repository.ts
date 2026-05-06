import { FavoriteEvent, FavoriteParticipant, FavoritesRepository } from "@/src/core/domain/ports/favorites-repository";

type StoredFavorites = {
	participants: FavoriteParticipant[];
	events: FavoriteEvent[];
};

export class LocalStorageFavoritesRepository implements FavoritesRepository {
	private storageKey = process.env.NEXT_PUBLIC_LOCALSTORAGE_KEY || "favorites";

	private read(): StoredFavorites {
		const defaultValue = { participants: [], events: [] };

		if (typeof window === "undefined") {
			return defaultValue;
		}

		const raw = localStorage.getItem(this.storageKey);

		if (!raw) {
			return defaultValue;
		}

		try {
			const data = JSON.parse(raw) as StoredFavorites;
			return data;
		} catch {
			return defaultValue;
		}
	}

	private write(data: StoredFavorites) {
		localStorage.setItem(this.storageKey, JSON.stringify(data));
	}

	async getFavoritesParticipants(): Promise<FavoriteParticipant[]> {
		return this.read().participants;
	}

	async getFavoriteEvent(): Promise<FavoriteEvent[]> {
		return this.read().events;
	}

	async toggleFavoriteParticipant(participant: FavoriteParticipant): Promise<void> {
		const data = this.read();

		const isInFavorite = data.participants.some(
			(item) => item.id === participant.id && item.sportType === participant.sportType
		);

		data.participants = isInFavorite
			? data.participants.filter(
					(item) => !(item.id === participant.id && item.sportType === participant.sportType)
				)
			: [...data.participants, participant];

		this.write(data);
	}

	async toggleFavoriteEvent(event: FavoriteEvent): Promise<void> {
		const data = this.read();

		const isInFavorite = data.events.some((item) => item.id === event.id && item.sportType === event.sportType);

		data.events = isInFavorite
			? data.events.filter((item) => !(item.id === event.id && item.sportType === event.sportType))
			: [...data.events, event];

		this.write(data);
	}
}

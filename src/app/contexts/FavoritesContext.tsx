'use client';

import * as React from 'react';
import { LocalStorageFavoritesRepository } from '@/src/infrastructure/favorites/local-storage-favorites-repository';
import { FavoriteEvent, FavoriteParticipant } from '@/src/core/domain/ports/favorites-repository';


type FavoritesContextValue = {
    participants: FavoriteParticipant[];
    events: FavoriteEvent[];
    toggleFavoriteParticipant: (participant: FavoriteParticipant) => void;
    isFavoriteParticipant: (participant: FavoriteParticipant) => boolean;
}

const FavoritesContext = React.createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider = ({ children }: {children: React.ReactNode}) => {
    const repoRef = React.useRef(new LocalStorageFavoritesRepository());

    const [participants, setParticipants] = React.useState<FavoriteParticipant[]>([]);
    const [events, setEvents] = React.useState<FavoriteEvent[]>([]);

    React.useEffect(() => {
        const load = async () => {
            const participants = await repoRef.current.getFavoritesParticipants();
            const events = await repoRef.current.getFavoriteEvent();

            setParticipants(participants);
            setEvents(events);
        }
        
        load();
    }, []);

    const toggleFavoriteParticipant = async (participant: FavoriteParticipant) => {
        await repoRef.current.toggleFavoriteParticipant(participant);

        const updated = await repoRef.current.getFavoritesParticipants();
        setParticipants(updated);
    }

    const isFavoriteParticipant = React.useCallback(
        (participant: FavoriteParticipant) => 
            participants.some(item => 
                item.id === participant.id &&
                item.sportType === participant.sportType
        ), [participants]
    );

    return (
        <FavoritesContext.Provider 
            value={{
                participants,
                events,
                toggleFavoriteParticipant,
                isFavoriteParticipant
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => {
    const ctx = React.useContext(FavoritesContext);
    if (!ctx) {
        throw new Error('useFavorites must be used inside FavoritesProvider');
    }
    return ctx;
}
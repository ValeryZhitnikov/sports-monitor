import { SportEvent } from '@/src/core/domain/models/sport-event';
import Link from 'next/link';

import { formatDate } from '@/src/app/lib/utils';
import { ParticipantCardLight } from '@/src/app/components/ui/ParticipantCardLight';
import { FavoriteButton } from '@/src/app/components/ui/FavoriteButton';

import classes from './EventCard.module.scss';

export interface EventProps {
    event: SportEvent;
}

export const EventCard = ({ event }: EventProps) => {
    const { id, participants, sportType, dateAt, tournament } = event;
    let formatted;
    if (dateAt) {
        formatted = formatDate(dateAt);
    }
    
    return (
        <div className={classes.event}>
            <div className={classes.content}>
                <div className={classes.participants}>
                    <ParticipantCardLight participant={participants[0]} path='/football/teams/' />
                    - 
                    <ParticipantCardLight participant={participants[1]} path='/football/teams/' />
                </div>
                <div className="tournament"><Link href={`/football/tournaments/${tournament.id}`}>{tournament.name}</Link></div>
                {dateAt && <div className="date">{formatted}</div>}
            </div>
            <FavoriteButton />
        </div>
    );
}
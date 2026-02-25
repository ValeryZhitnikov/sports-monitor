import { SportEvent } from '@/src/core/domain/models/sport-event';
import { Container } from '@/src/app/components/layout/Container';
import { EventCard } from '@/src/app/components/ui/EventCard';

import classes from './EventsList.module.scss';

interface EventsListProps {
    events: SportEvent[]
}
export const EventsList = ({ events }: EventsListProps) => {
    let result;

    if (events.length === 0) {
        result = (
            <p>Событий нет</p>
        )
    } else {
        result = events.map((event, index) => {
            return (
                <EventCard key={index} event={event} />
            )
        })
    }

    return (
        <Container className={classes.wrap}>
            {result}
        </Container>
    )
}
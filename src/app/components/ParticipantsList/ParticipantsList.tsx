import type { Participant } from '@/src/core/domain/models/participant';

import { Container } from '@/src/app/components/layout/Container';
import { ParticipantCard } from '@/src/app/components/ui/ParticipantCard';

import classes from './ParticipantsList.module.scss';

interface ParticipantsListProps {
    participants: Participant[]
}
export const ParticipantsList = ({ participants }: ParticipantsListProps) => {
    let result;

    if (participants.length === 0) {
        result = (
            <p>Команд нет</p>
        )
    } else {
        result = participants.map((participant, index) => {
            return (
                <ParticipantCard key={index} participant={participant} path={`/football/teams/`} />
            )
        })
    }

    return (
        <Container className={classes.wrap}>
            {result}
        </Container>
    )
}
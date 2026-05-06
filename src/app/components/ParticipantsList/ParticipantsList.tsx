import type { Participant } from "@/src/core/domain/models/participant";
import type { SportType } from "@/src/core/domain/models/participant";

import { Container } from "@/src/app/components/layout/Container";
import { ParticipantCard } from "@/src/app/components/ui/ParticipantCard";

import classes from "./ParticipantsList.module.scss";

interface ParticipantsListProps {
	participants: Participant[];
	path?: string;
	sportType: SportType;
}
export const ParticipantsList = ({ participants, path, sportType }: ParticipantsListProps) => {
	const defaultPath = `/${sportType}/teams/`;
	const finalPath = path || defaultPath;

	let result;

	if (participants.length === 0) {
		result = <p>Команд нет</p>;
	} else {
		result = participants.map((participant, index) => {
			return <ParticipantCard key={index} participant={participant} path={finalPath} />;
		});
	}

	return <Container className={classes.wrap}>{result}</Container>;
};

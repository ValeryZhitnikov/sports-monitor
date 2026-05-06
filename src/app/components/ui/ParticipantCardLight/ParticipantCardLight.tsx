import type { Participant } from "@/src/core/domain/models/participant";

import * as React from "react";

import clsx from "clsx";
import Link from "next/link";

import classes from "./ParticipantCardLight.module.scss";

export interface ParticipantProps extends React.HTMLAttributes<HTMLElement> {
	participant: Participant;
	path: string;
}

export const ParticipantCardLight = ({ participant, path, ...rest }: ParticipantProps) => {
	return (
		<Link className={clsx(rest.className, classes.participant)} href={`${path}${participant.id}`}>
			{participant.name}
		</Link>
	);
};

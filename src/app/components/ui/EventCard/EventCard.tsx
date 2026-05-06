"use client";

import { SportEvent } from "@/src/core/domain/models/sport-event";
import Link from "next/link";

import { useFavorites } from "@/src/app/contexts/FavoritesContext";
import { formatDate } from "@/src/app/lib/utils";
import { ParticipantCardLight } from "@/src/app/components/ui/ParticipantCardLight";
import { FavoriteButton } from "@/src/app/components/ui/FavoriteButton";

import classes from "./EventCard.module.scss";

export interface EventProps {
	event: SportEvent;
}

export const EventCard = ({ event }: EventProps) => {
	const { id, participants, sportType, dateAt, tournament } = event;
	const { isFavoriteEvent, toggleFavoriteEvent } = useFavorites();
	const favoritesEvent = {
		id,
		sportType,
	};

	const isInFavorites = isFavoriteEvent(favoritesEvent);

	const clickHandler = () => {
		toggleFavoriteEvent(favoritesEvent);
	};

	let formatted;
	if (dateAt) {
		formatted = formatDate(dateAt);
	}

	return (
		<div className={classes.event}>
			<div className={classes.content}>
				<div className={classes.participants}>
					<ParticipantCardLight participant={participants[0]} path={`/${sportType}/teams/`} />
					-
					<ParticipantCardLight participant={participants[1]} path={`/${sportType}/teams/`} />
				</div>
				<div className={classes.tournament}>
					<Link href={`/${sportType}/tournaments/${tournament.id}`}>{tournament.name}</Link>
				</div>
				{dateAt && <div className={classes.date}>{formatted}</div>}
			</div>
			<FavoriteButton
				className={classes.favoriteButton}
				type={isInFavorites ? "active" : "empty"}
				onClick={clickHandler}
			/>
		</div>
	);
};

"use client";

import { useFavorites } from "@/src/app/contexts/FavoritesContext";
import { Container } from "@/src/app/components/layout/Container";
import Link from "next/link";
import { groupBySportType } from "@/src/app/lib/utils";

import classes from "./FavoritesList.module.scss";

export const FavoritesList = () => {
	const { favorites } = useFavorites();

	const { participants, events } = favorites;

	const groupedParticipants = groupBySportType(participants);
	const groupedEvents = groupBySportType(events);

	console.log(groupedParticipants);
	console.log(groupedEvents);

	if (participants.length === 0 && events.length === 0) {
		return (
			<Container>
				<p className={classes.empty}>Нет избранных элементов</p>
			</Container>
		);
	}

	return (
		<Container>
			<div className={classes.container}>
				{participants.length > 0 && (
					<section className={classes.section}>
						<h2 className={classes.title}>Избранные команды</h2>
						<ul className={classes.list}>
							{participants.map((participant) => (
								<li key={`${participant.sportType}-${participant.id}`} className={classes.item}>
									<Link href={`/${participant.sportType}/teams/${participant.id}`}>
										{participant.name ?? participant.id}
									</Link>
								</li>
							))}
						</ul>
					</section>
				)}

				{events.length > 0 && (
					<section className={classes.section}>
						<h2 className={classes.title}>Избранные события</h2>
						<ul className={classes.list}>
							{events.map((event) => (
								<li key={`${event.sportType}-${event.id}`} className={classes.item}>
									<span>{event.id}</span>
								</li>
							))}
						</ul>
					</section>
				)}
			</div>
		</Container>
	);
};

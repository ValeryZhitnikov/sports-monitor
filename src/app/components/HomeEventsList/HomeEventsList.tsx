"use client";
import type { SportEvent } from "@/src/core/domain/models/sport-event";

import * as React from "react";
import { createGetEventsForDayUseCase } from "@/src/infrastructure/composition-root";
import { EventsList } from "@/src/app/components/EventsList";
import { useFavorites } from "@/src/app/contexts/FavoritesContext";

import classes from "./HomeEventsList.module.scss";

export const HomeEventsList = ({ day }: { day: Date }) => {
	const { favorites } = useFavorites();
	const [eventsList, setEvents] = React.useState<SportEvent[] | []>([]);
	React.useEffect(() => {
		const load = async () => {
			const getEventsForDay = createGetEventsForDayUseCase();
			const result = await getEventsForDay.execute(day, favorites);
			const eventsQueryResult = result.getValue() || [];
			setEvents(eventsQueryResult);
		};

		load();
	}, [day, favorites]);

	return <EventsList events={eventsList} />;
};

'use client';
import type { SportEvent } from "@/src/core/domain/models/sport-event";

import * as React from "react";
import { createGetEventsForDayUseCase } from "@/src/infrastructure/composition-root";
import { EventsList } from "@/src/app/components/EventsList";

import classes from "./HomeEventsList.module.scss";

export const HomeEventsList = ({day}: {day: Date}) => {
  const [events, setEvents] = React.useState<SportEvent[] | []>([]);

  React.useEffect(() => {

    const load = async () => {
      const getEventsForDay = createGetEventsForDayUseCase();
      const result = await getEventsForDay.execute(day, 'favorites');
      const events = result.getValue() || [];
      setEvents(events);
    }

    load();
    
  },[day]);
  
  return (
    <EventsList events={events} />
  );
};

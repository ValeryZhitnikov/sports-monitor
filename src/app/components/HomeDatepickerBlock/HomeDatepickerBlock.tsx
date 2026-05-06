"use client";

import * as React from "react";

import { Datepicker } from "@/src/app/components/Datepicker/Datepicker";
import { Container } from "@/src/app/components/layout/Container";
import { useDateNavigation } from "@/src/app/hooks/use-date-navigation";
import { FaXmark, FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import classes from "./HomeDatepickerBlock.module.scss";

export const HomeDatepickerBlock = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const { currentDate, setDate, setNextDate, setPrevDate } = useDateNavigation();

	const formatted = currentDate.toLocaleDateString("ru-RU", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	const onSelectHandler = React.useCallback(
		(date: Date) => {
			setDate(date);
			setIsOpen(false);
		},
		[setDate]
	);

	return (
		<Container className={classes.wrap}>
			<button className={classes.datepickerButton} onClick={() => setPrevDate()}>
				<FaAngleLeft />
			</button>
			<button className={classes.datepickerButton} type="button" onClick={() => setIsOpen(true)}>
				{formatted}
			</button>
			<button className={classes.datepickerButton} onClick={() => setNextDate()}>
				<FaAngleRight />
			</button>
			{isOpen && (
				<div className={classes.datepicker}>
					<button type="button" className={classes.close} onClick={() => setIsOpen(false)}>
						<FaXmark />
					</button>
					<Datepicker onSelect={onSelectHandler} selectedDate={currentDate} />
				</div>
			)}
		</Container>
	);
};

HomeDatepickerBlock.displayName = "HomeDatepickerBlock";

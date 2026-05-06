"use client";

import * as React from "react";
import AirDatepicker from "air-datepicker";

import classes from "./Datepicker.module.scss";

export interface DatepickerProps {
	onSelect: (date: Date) => void;
	selectedDate: Date;
}

const isSameDay = (left: Date, right: Date) => {
	return (
		left.getFullYear() === right.getFullYear() &&
		left.getMonth() === right.getMonth() &&
		left.getDate() === right.getDate()
	);
};

export const Datepicker = ({ onSelect, selectedDate }: DatepickerProps) => {
	const rootRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		if (!rootRef.current) {
			return;
		}

		const today = new Date();

		const picker = new AirDatepicker(rootRef.current, {
			selectedDates: [selectedDate],
			startDate: selectedDate,
			onSelect({ date }) {
				const selectedDate = Array.isArray(date) ? date[0] : date;

				if (!selectedDate) {
					return;
				}

				onSelect(selectedDate);
			},
			buttons: [
				{
					content: "Сегодня",
					onClick(dp) {
						const today = new Date();

						dp.setViewDate(today);
						dp.selectDate(today);
					},
				},
			],
			onRenderCell({ date, cellType }) {
				if (cellType !== "day") {
					return {};
				}

				if (isSameDay(date, today)) {
					return {
						classes: classes.todayCell,
					};
				}

				return {};
			},
		});

		return () => picker.destroy();
	}, [onSelect, selectedDate]);

	return <div ref={rootRef} className={classes.root}></div>;
};

Datepicker.displayName = "Datepicker";

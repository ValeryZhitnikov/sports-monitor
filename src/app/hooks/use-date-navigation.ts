"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { changeDateInRouter } from "@/src/app/lib/change-date-in-router";

const parseCurrentDate = (rawDate: string | null): Date => {
	if (!rawDate) {
		return new Date();
	}

	const match = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);

	if (!match) {
		return new Date();
	}

	const [, yearRaw, monthRaw, dayRaw] = match;
	const year = Number(yearRaw);
	const month = Number(monthRaw);
	const day = Number(dayRaw);
	const parsed = new Date(year, month - 1, day);

	if (
		Number.isNaN(parsed.getTime()) ||
		parsed.getFullYear() !== year ||
		parsed.getMonth() !== month - 1 ||
		parsed.getDate() !== day
	) {
		return new Date();
	}

	return parsed;
};

export const useDateNavigation = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentDate = React.useMemo(() => parseCurrentDate(searchParams.get("date")), [searchParams]);

	const setNextDate = React.useCallback(() => {
		const next = new Date(currentDate);
		next.setDate(next.getDate() + 1);

		changeDateInRouter(router, searchParams, next);
	}, [currentDate]);

	const setPrevDate = React.useCallback(() => {
		const prev = new Date(currentDate);
		prev.setDate(prev.getDate() - 1);

		changeDateInRouter(router, searchParams, prev);
	}, [currentDate]);

	const setDate = React.useCallback(
		(date: Date) => {
			changeDateInRouter(router, searchParams, date);
		},
		[router, searchParams]
	);

	return {
		currentDate,
		setDate,
		setNextDate,
		setPrevDate,
	};
};

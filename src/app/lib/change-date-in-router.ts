type RouterLike = {
	push: (href: string) => void;
	refresh: () => void;
};

type SearchParamsLike = URLSearchParams | { toString(): string };

const formatDateParam = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};

export const changeDateInRouter = (router: RouterLike, searchParams: SearchParamsLike, date: Date) => {
	const params = new URLSearchParams(searchParams.toString());
	params.set("date", formatDateParam(date));

	router.push(`/?${params.toString()}`);
	router.refresh();
};

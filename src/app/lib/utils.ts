export const formatDate = (date: Date | string): string => {
	const formatted = new Intl.DateTimeFormat("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	})
		.format(new Date(date))
		.replace(" в", ",")
		.replace(" г.", "");

	return formatted;
};

export const groupBySportType = <T extends { sportType: string }>(items: T[]): Record<string, T[]> => {
	return items.reduce(
		(acc, item) => {
			if (!acc[item.sportType]) {
				acc[item.sportType] = [];
			}
			acc[item.sportType].push(item);
			return acc;
		},
		{} as Record<string, T[]>
	);
};

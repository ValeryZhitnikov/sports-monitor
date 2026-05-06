import slugify from "slugify";

export const slugifyName = (name: string): string => {
	return slugify(name, {
		replacement: "-",
		lower: true,
	});
};

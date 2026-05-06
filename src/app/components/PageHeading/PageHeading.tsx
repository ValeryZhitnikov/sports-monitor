import Link from "next/link";

import { Container } from "@/src/app/components/layout/Container";

import classes from "./PageHeading.module.scss";

interface Props {
	title: string;
}

const linkList = [
	{ href: "/", label: "Главная" },
	{ href: "/favorites", label: "Избранное" },
	{ href: "/auth", label: "Авторизация" },
	{ href: "/football/countries/", label: "Teams" },
	{ href: "/football/teams/529", label: "Barcelona" },
	{ href: "/football/teams/33", label: "MU" },
];

export const PageHeading = ({ title }: Props) => {
	return (
		<Container className={classes.wrap}>
			<ul className={classes.menu}>
				{linkList.map((link) => (
					<li key={link.href}>
						<Link href={link.href}>{link.label}</Link>
					</li>
				))}
			</ul>
		</Container>
	);
};

import type { SportType } from "@/src/core/domain/models/participant";

import Link from "next/link";
import { Container } from "@/src/app/components/layout/Container";

const countries = [
	"Russia",
	"England",
	"Spain",
	"Italy",
	"Germany",
	"France",
	"Portugal",
	"Netherlands",
	"Brazil",
	"Argentina",
	"Uruguay",
	"Colombia",
	"Mexico",
	"USA",
	"Canada",
	"Australia",
	"Japan",
	"South Korea",
	"China",
	"Turkey",
];

type Props = { params: Promise<{ sportType: SportType }> };

export default async function Countries({ params }: Props) {
	const { sportType } = await params;

	return (
		<Container>
			<ul>
				{countries.map((country) => (
					<li key={country}>
						<Link href={`/${sportType}/countries/${encodeURIComponent(country.toLowerCase())}`}>
							{country}
						</Link>
					</li>
				))}
			</ul>
		</Container>
	);
}

import Link from "next/link";
import type { SportType } from "@/src/core/domain/models/participant";

type Props = { params: Promise<{ sportType: SportType }> };

export default async function SportTypePage({ params }: Props) {
	const { sportType } = await params;

	return (
		<div>
			<h1>{sportType.charAt(0).toUpperCase() + sportType.slice(1)}</h1>
			<ul>
				<li>
					<Link href={`/${sportType}/teams`}>Teams</Link>
				</li>
				<li>
					<Link href={`/${sportType}/countries`}>Countries</Link>
				</li>
				<li>
					<Link href={`/${sportType}/tournaments`}>Tournaments</Link>
				</li>
			</ul>
		</div>
	);
}

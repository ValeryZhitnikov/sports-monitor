import type { SportType } from "@/src/core/domain/models/participant";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ sportType: SportType }> };

export default async function Teams({ params }: Props) {
	const { sportType } = await params;
	
	redirect(`/${sportType}/countries`);
}

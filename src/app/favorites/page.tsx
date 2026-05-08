"use client";

import { Container } from "@/src/app/components/layout/Container";
import { FavoritesList } from "@/src/app/components/FavoritesList";

export default function FavoritesPage() {
	return (
		<>
			<Container className="flex items-center justify-center mt-1 mb-8">
				<h1>Избранное</h1>
			</Container>
			<FavoritesList />
		</>
	);
}

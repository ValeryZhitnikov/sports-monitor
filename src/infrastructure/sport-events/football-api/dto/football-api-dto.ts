export interface FootballApiEventsResponseDto {
	status: string;
	count: number | null;
	data: FootballApiMatchDto[] | null;
	requestQuery: null | string;
	message: string | null;
	offset: number | null;
	TotalCount: null | number | string;
	traceId: string | null;
}

export interface FootballApiParticipantsResponseDto {
	status: string;
	count: number | null;
	data: FootballApiTeamDto[] | null;
	requestQuery: string | null;
	message: string | null;
	offset: number | null;
	TotalCount: null | number | string;
	traceId: string | null;
}

export interface FootballApiParticipantResponseDto {
	status: string;
	count: number | null;
	data: FootballApiTeamDto | null;
	requestQuery: string | null;
	message: string | null;
	offset: number | null;
	TotalCount: number | null;
	traceId: string | null;
}

export interface FootballApiTeamFullDto {
	id: number;
	name: string;
	flashId: number | null;
	logoUrl: string | null;
	country: FootballApiCountryDto;
	code: string | null;
	founded: number | null;
	seasons: FootballApiSeasonDto[];
	venue: FootballApiVenueDto;
	coach: FootballApiCoachDto;
	players: FootballApiPlayerDto[];
}

export interface FootballApiCountryDto {
	code: string;
	name: string;
}

export interface FootballApiSeasonDto {
	uid: string; // UUID
	year: number;
	league: FootballApiLeagueDto;
}

export interface FootballApiLeagueDto {
	id: number;
	name: string;
	country: FootballApiCountryDto;
	flashScoreId: number | null;
}

export interface FootballApiVenueDto {
	name: string | null;
	address: string | null;
	city: string | null;
	capacity: number | null;
}

export interface FootballApiCoachDto {
	id: number | null;
	name: string;
}

export interface FootballApiPlayerDto {
	id: number | null;
	name: string;
}

export interface FootballApiTeamDto {
	id: number;
	name: string;
	flashId: number | null;
	logoUrl: string | null;
	country: {
		code: string;
		name: string;
	};
}

export interface FootballApiMatchDto {
	id: number;
	flashId: number | null;
	date: string | null;
	dateUtc: string | null;
	status: string | null;
	periods: string[];
	statusName: string | null;
	elapsed: number | null;
	extraMinutes: number | null;
	homeResult: number | null;
	awayResult: number | null;
	homeHTResult: number | null;
	awayHTResult: number | null;
	homeFTResult: number | null;
	awayFTResult: number | null;
	homeTeam: FootballApiTeamDto;
	awayTeam: FootballApiTeamDto;
	season: {
		uid: string;
		year: number;
		league: {
			id: number;
			name: string;
			country: {
				code: string;
				name: string;
			};
			flashScoreId: number | null;
		};
	};
	roundName: string | null;
	odds: {
		marketId: number;
		marketName: string;
		odds: {
			name: string;
			value: number;
			openingValue: number | null;
		}[];
	}[];
}

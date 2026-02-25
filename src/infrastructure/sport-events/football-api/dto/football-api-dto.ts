export interface FootballApiEventsResponseDto {
  status: string;
  count: number | null;
  data: FootballApiMatchDto[] | null;
  requestQuery: null | string;
  message: string | null;
  offset: number | null;
  TotalCount: null | number | string;
  traceId: string | null;
};

export interface FootballApiParticipantsResponseDto {
  status: string;
  count: number | null;
  data: FootballApiTeamDto[] | null;
  requestQuery: string | null;
  message: string | null;
  offset: number | null;
  TotalCount: null | number | string;
  traceId: string | null;
};

export interface FootballApiTeamDto {
  id: number;
  name: string;
  flashId: number | null;
  logoUrl: string | null;
  country: {
    code: string;
    name: string;
  };
};

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
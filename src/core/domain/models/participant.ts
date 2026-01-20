export type SportType = "football" | "hockey" | "skiing" | "basketball";

export type ParticipantType = "team" | "athlete";

export interface Participant {
  id: string;
  sportType: SportType;
  name: string;
  slug: string;
  logo: string | null;
}
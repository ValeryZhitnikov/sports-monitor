import { SportType, Participant } from "@/src/core/domain/models/participant";

export interface SportEvent {
  id: string;
  sportType: SportType;
  dateAt: string | null;
  tournament: string | null;
  participants: Participant[];
}
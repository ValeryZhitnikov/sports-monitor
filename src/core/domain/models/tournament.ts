import { SportType } from "@/src/core/domain/models/participant";

export interface Tournament {
  id: string;
  name: string;
  sportType: SportType;
  slug: string;
  logo?: string;
  startDate?: Date;
  endDate?: Date;
}
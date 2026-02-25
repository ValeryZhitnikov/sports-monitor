import { Result } from "@/src/core/domain/utils/result";
import { Participant, SportType } from "@/src/core/domain/models/participant";

export interface ParticipantQueryCriteria {
    limit?: number;
    country?: string;
    ids?: string[];
    slugs?: string[];
    sportType?: SportType;
    tournamentId?: string;
}

export interface ParticipantQuery {
    getById(id: string): Promise<Result<Participant>>;
    getBySlug(slug: string): Promise<Result<Participant>>;
    getMany(criteria: ParticipantQueryCriteria): Promise<Result<Participant[]>>;
}
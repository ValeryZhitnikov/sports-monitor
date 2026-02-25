import type { Participant } from "@/src/core/domain/models/participant";
import type { ParticipantQuery, ParticipantQueryCriteria } from "@/src/core/domain/ports/participants-query"; 
import type { FootballApiParticipantsResponseDto } from "../dto/football-api-dto";
import { Result } from "@/src/core/domain/utils/result";
import { FootballApiClient } from "../http/football-api-client";
import { buildQueryString } from "../http/build-query-string";
import { footballApiParticipantMapper } from "../mappers/participant.mapper";

export class FootballApiParticipantQuery implements ParticipantQuery {
    constructor(private client = new FootballApiClient()) {};

    async getById(id: string): Promise<Result<Participant>> {
        return Result.failure('Error');
    }

    async getBySlug(slug: string): Promise<Result<Participant>> {
        return Result.failure('Error');
    }

    async getMany(criteria?: ParticipantQueryCriteria): Promise<Result<Participant[]>> {
        const defaultCriteria: ParticipantQueryCriteria = {
            limit: 10
        }
        const queryParams = buildQueryString({...defaultCriteria, ...criteria});
        const response = await this.client.get<FootballApiParticipantsResponseDto>(`teams/list?${queryParams}`);      
        if (!response.isSuccess()) {
            return Result.failure(response.getError()!);
        }

        const data = response.getValue()?.data ?? [];
        return Result.success(data.map(item => footballApiParticipantMapper(item)));
    }
}
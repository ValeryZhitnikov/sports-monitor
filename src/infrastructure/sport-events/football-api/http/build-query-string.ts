import type { ParticipantQueryCriteria } from "@/src/core/domain/ports/participants-query";

export const buildQueryString = (
  params: ParticipantQueryCriteria
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      searchParams.append(key, value.join(','));
    } else {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}
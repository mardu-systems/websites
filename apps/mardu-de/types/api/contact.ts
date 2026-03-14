export type {
  ContactRequestDto,
  ContactResponseDto,
  ContactSource,
} from '@mardu/lead-core';

export interface ContactErrorResponseDto {
  error: string;
  details?: Record<string, string[] | undefined>;
}

import { SetMetadata } from '@nestjs/common';

export interface ResponseMetadata {
  message?: string;
  statusCode?: number;
}

export const RESPONSE_METADATA = 'response_metadata';

export const ApiCustomResponse = (metadata: ResponseMetadata) =>
  SetMetadata(RESPONSE_METADATA, metadata);

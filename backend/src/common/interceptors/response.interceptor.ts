import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/response.interface';
import { Reflector } from '@nestjs/core';
import {
  RESPONSE_METADATA,
  ResponseMetadata,
} from '../decorators/api-response.decorator';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const metadata = this.reflector.get<ResponseMetadata>(
      RESPONSE_METADATA,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => {
        const statusCode =
          metadata?.statusCode || response.statusCode || HttpStatus.OK;

        response.status(statusCode);

        return {
          statusCode,
          success: true,
          message: metadata?.message || 'Operation successful',
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}

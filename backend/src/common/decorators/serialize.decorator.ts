import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { SerializeInterceptor } from "../interceptors/serialize.interceptor";

export function Serialize(dto: any) {
  return applyDecorators(
    UseInterceptors(new SerializeInterceptor(dto)),
  );
}
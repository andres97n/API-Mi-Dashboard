import { Global, Module } from "@nestjs/common";

import { RequestContext } from "./providers";


@Global()
@Module({
  providers: [RequestContext],
  exports: [RequestContext],
})
export class RequestContextModule {}

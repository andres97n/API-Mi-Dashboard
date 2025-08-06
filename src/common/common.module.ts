import { Global, Module } from '@nestjs/common';
import { RequestContext } from './providers';
import { AxiosAdapter } from './adapters';


@Global()
@Module({
  providers: [RequestContext, AxiosAdapter],
  exports: [RequestContext, AxiosAdapter],
})
export class CommonModule {}

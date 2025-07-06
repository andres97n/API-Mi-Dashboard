import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SerieModule } from './serie/serie.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI ?? 'mongodb://localhost:27017/mi-dashboard'),
    SerieModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

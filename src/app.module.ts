import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI ?? 'mongodb://localhost:27017/mi-dashboard')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

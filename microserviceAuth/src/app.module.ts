import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassengerModule } from './passenger/passenger.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:['.env.development'],
    isGlobal:true
  }),
  MongooseModule.forRoot(process.env.URI_MONGODB || 'mongodb://localhost:27017/superflights'),
  PassengerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

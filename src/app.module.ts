import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { WinstonModule } from 'nest-winston';
import { dbOptions } from './config/db.config';
import { WinstonConfigs } from './config/winston.config';
import { IamModule } from './modules/iam/iam.module';
import { SerialsModule } from './modules/serial/serials.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.get('db.connectionString'), dbOptions),
    WinstonModule.forRoot(WinstonConfigs),
    IamModule,
    SerialsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

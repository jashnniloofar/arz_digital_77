import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { dbOptions } from './config/db.config';
import { WinstonConfigs } from './config/winston.config';
import { IamModule } from './modules/iam/iam.module';
import { SerialsModule } from './modules/serial/serials.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbOptions),
    WinstonModule.forRoot(WinstonConfigs),
    IamModule,
    SerialsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

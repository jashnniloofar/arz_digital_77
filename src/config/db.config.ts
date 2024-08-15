import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

export const dbOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: config.get<string>('db.host'),
  port: config.get<number>('db.port'),
  username: config.get<string>('db.username'),
  password: config.get<string>('db.password'),
  database: config.get<string>('db.database'),
  synchronize: config.get<boolean>('db.synchronize'),
  autoLoadEntities: true,
};

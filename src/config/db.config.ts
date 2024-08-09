import * as config from 'config';

const certFileName: string | undefined = config.has('db.certificateFileName') ? config.get('db.certificateFileName') : undefined;
export const dbOptions = {
  dbName: config.get<string>('db.database'),
  tls: config.has('db.tls') ? config.get<boolean>('db.tls') : false,
  tlsCAFile: certFileName,
  retryWrites: false,
};

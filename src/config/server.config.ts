import * as config from 'config';

const port = config.get<number>('server.port');
const basePath = config.get<string>('server.basePath');
const host = config.get<string>('server.host');
const protocol = config.get<string>('server.protocol');

export const serverConfig = {
  port,
  basePath,
  host,
  protocol,
  enableDocumentation: config.get<boolean>('server.enableDocumentation'),
  shortUrl: `${protocol}://${host}:${port}`,
  url: `${protocol}://${host}:${port}/${basePath}`,
};

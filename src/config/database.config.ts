import { registerAs, ConfigObject } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs<ConfigObject, () => TypeOrmModuleOptions>(
  'database',
  () => {
    return {
      type: process.env.DB_TYPE || 'spanner',
      instanceId: process.env.SPANNER_INSTANCE || 'edissa-instance',
      databaseId: process.env.SPANNER_DB || 'edissa-db',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    } as TypeOrmModuleOptions;
  },
);

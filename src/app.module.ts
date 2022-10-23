import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpannerConnectionOptions } from 'typeorm/driver/spanner/SpannerConnectionOptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchantsModule } from './merchants/merchants.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import gcpConfig from './config/gcp.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, gcpConfig],
      envFilePath: ['config/local.env', `config/${process.env.NODE_ENV}.env`],
    }),
    UsersModule,
    ReservationsModule,
    MerchantsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseOptions = configService.get<SpannerConnectionOptions>(
          'database',
          { infer: true },
        );

        const { projectId } = configService.get<{ projectId: string }>('gcp', {
          infer: true,
        });

        return {
          autoLoadEntities: true,
          ...databaseOptions,
          projectId,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'
import { HealthModule } from './modules/health/health.module'
import { KeywordsModule } from './modules/keywords/keywords.module'
import { OrganizationsModule } from './modules/organizations/organizations.module'
import { resolve } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        url: cfg.get('DATABASE_URL', 'postgres://trendpulse:devpassword@localhost:5432/trendpulse'),
        entities: [resolve(__dirname, 'entities/**/*.{ts,js}')],
        synchronize: cfg.get('NODE_ENV') !== 'production',
        logging: cfg.get('NODE_ENV') !== 'production',
        poolSize: parseInt(cfg.get('DB_POOL_SIZE', '10')),
        ssl: cfg.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
    }),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        redis: {
          host: new URL(cfg.get('REDIS_URL', 'redis://localhost:6379')).hostname,
          port: parseInt(new URL(cfg.get('REDIS_URL', 'redis://localhost:6379')).port || '6379'),
        },
      }),
    }),

    HealthModule,
    KeywordsModule,
    OrganizationsModule,
  ],
})
export class AppModule {}

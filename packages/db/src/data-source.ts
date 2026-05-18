import { DataSource, DataSourceOptions } from 'typeorm'
import { config } from 'dotenv'
import { resolve } from 'path'

config()

const isDev = process.env.NODE_ENV !== 'production'

const options: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://trendpulse:devpassword@localhost:5432/trendpulse',
  entities: [resolve(__dirname, 'entities/**/*.entity.{ts,js}')],
  migrations: [resolve(__dirname, 'migrations/**/*.{ts,js}')],
  synchronize: isDev,
  logging: isDev,
  poolSize: parseInt(process.env.DB_POOL_SIZE || '10'),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
}

export const AppDataSource = new DataSource(options)

import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthService {
  async check() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'up',
        redis: 'up',
      },
    }
  }
}

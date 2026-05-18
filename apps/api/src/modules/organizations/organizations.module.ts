import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Organization, OrganizationMember } from '../../entities'
import { OrganizationsController } from './organizations.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrganizationMember])],
  controllers: [OrganizationsController],
})
export class OrganizationsModule {}

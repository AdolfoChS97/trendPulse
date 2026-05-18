import { Controller, Get, Param } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Organization, OrganizationMember } from '../../entities'

@Controller('organizations')
export class OrganizationsController {
  constructor(
    @InjectRepository(Organization)
    private orgRepo: Repository<Organization>,
    @InjectRepository(OrganizationMember)
    private memberRepo: Repository<OrganizationMember>,
  ) {}

  @Get()
  async findByUser() {
    const memberships = await this.memberRepo.find({
      where: { user_id: '00000000-0000-0000-0000-000000000001' },
    })
    return memberships.map((m) => ({
      id: m.organization_id,
      name: m.organization_id,
      role_id: m.role_id,
    }))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orgRepo.findOne({ where: { id } })
  }
}

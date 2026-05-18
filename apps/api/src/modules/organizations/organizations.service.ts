import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Organization, OrganizationMember, OrganizationRole } from '../../entities'

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private orgRepo: Repository<Organization>,
    @InjectRepository(OrganizationMember)
    private memberRepo: Repository<OrganizationMember>,
  ) {}

  async findByUser(userId: string) {
    const memberships = await this.memberRepo.find({
      where: { user_id: userId },
      relations: ['organization', 'role'],
    })
    return memberships.map((m) => ({
      id: m.organization.id,
      name: m.organization.name,
      slug: m.organization.slug,
      type: m.organization.type,
      tier: m.organization.tier,
      onboarding_completed: m.organization.onboarding_completed,
      onboarding_step: m.organization.onboarding_step,
      role: m.role.name,
      role_id: m.role_id,
    }))
  }

  async findOne(id: string) {
    const org = await this.orgRepo.findOne({ where: { id } })
    if (!org) throw new NotFoundException('Organization not found')
    return org
  }

  async create(name: string, type: 'individual' | 'company' | 'agency' = 'individual') {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const org = this.orgRepo.create({ name, slug, type })
    return this.orgRepo.save(org)
  }
}

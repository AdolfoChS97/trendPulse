import { AppDataSource } from './data-source'
import { Organization } from './entities/organization.entity'
import { OrganizationRole, OrganizationMember } from './entities/organization.entity'
import { Permission } from './entities/organization.entity'
import { User } from './entities/user.entity'
import { Keyword } from './entities/user.entity'
import { v4 as uuid } from 'crypto'

async function seed() {
  const ds = await AppDataSource.initialize()
  const repo = {
    user: ds.getRepository(User),
    org: ds.getRepository(Organization),
    role: ds.getRepository(OrganizationRole),
    member: ds.getRepository(OrganizationMember),
    perm: ds.getRepository(Permission),
    keyword: ds.getRepository(Keyword),
  }

  console.log('🌱 Seeding database...')

  // ── Permissions ──
  const perms = [
    { resource: 'keywords', action: 'create', description: 'Create keywords' },
    { resource: 'keywords', action: 'read', description: 'View keywords' },
    { resource: 'keywords', action: 'update', description: 'Edit keywords' },
    { resource: 'keywords', action: 'delete', description: 'Delete keywords' },
    { resource: 'keywords', action: 'export', description: 'Export keyword data' },
    { resource: 'platforms', action: 'connect', description: 'Connect social accounts' },
    { resource: 'platforms', action: 'disconnect', description: 'Disconnect accounts' },
    { resource: 'platforms', action: 'view', description: 'View connected accounts' },
    { resource: 'alerts', action: 'create', description: 'Create alerts' },
    { resource: 'alerts', action: 'read', description: 'View alerts' },
    { resource: 'alerts', action: 'delete', description: 'Delete alerts' },
    { resource: 'billing', action: 'read', description: 'View billing' },
    { resource: 'billing', action: 'manage', description: 'Manage billing' },
    { resource: 'members', action: 'invite', description: 'Invite members' },
    { resource: 'members', action: 'remove', description: 'Remove members' },
    { resource: 'members', action: 'change_role', description: 'Change member role' },
    { resource: 'insights', action: 'read', description: 'View AI insights' },
    { resource: 'reports', action: 'generate', description: 'Generate reports' },
    { resource: 'api', action: 'access', description: 'API access' },
  ]
  const savedPerms: Record<string, Permission> = {}
  for (const p of perms) {
    const perm = repo.perm.create(p)
    savedPerms[`${p.resource}:${p.action}`] = await repo.perm.save(perm)
  }
  console.log(`  ✅ ${Object.keys(savedPerms).length} permissions`)

  // ── Users ──
  const superAdmin = repo.user.create({
    id: '00000000-0000-0000-0000-000000000001',
    email: 'adolfo@trendpulse.app',
    name: 'Adolfo',
    platform_role: 'super_admin',
  })
  const memberUser = repo.user.create({
    id: '00000000-0000-0000-0000-000000000002',
    email: 'ana@trendpulse.app',
    name: 'Ana',
    platform_role: 'user',
  })
  await repo.user.save([superAdmin, memberUser])
  console.log('  ✅ 2 users (adolfo, ana)')

  // ── Organizations ──
  const org1 = repo.org.create({
    id: '00000000-0000-0000-0000-aaaaaaaa0001',
    name: 'TrendPulse HQ',
    slug: 'trendpulse-hq',
    type: 'company',
    tier: 'agency',
    onboarding_completed: true,
    onboarding_step: 3,
  })
  const org2 = repo.org.create({
    id: '00000000-0000-0000-0000-aaaaaaaa0002',
    name: 'Maria Creates',
    slug: 'maria-creates',
    type: 'individual',
    tier: 'creator',
    onboarding_completed: false,
    onboarding_step: 1,
  })
  await repo.org.save([org1, org2])
  console.log('  ✅ 2 organizations')

  // ── Roles ──
  const systemRoles = ['owner', 'admin', 'analyst', 'viewer']
  const roleMap: Record<string, OrganizationRole> = {}
  for (const name of systemRoles) {
    const r = repo.role.create({ organization_id: org1.id, name, is_system: true })
    roleMap[name] = await repo.role.save(r)
  }
  console.log('  ✅ 4 system roles')

  // ── Members ──
  await repo.member.save([
    repo.member.create({ organization_id: org1.id, user_id: superAdmin.id, role_id: roleMap['owner'].id }),
    repo.member.create({ organization_id: org1.id, user_id: memberUser.id, role_id: roleMap['analyst'].id, invited_by: superAdmin.id }),
    repo.member.create({ organization_id: org2.id, user_id: memberUser.id, role_id: roleMap['owner'].id }),
  ])
  console.log('  ✅ 3 memberships')

  // ── Keywords ──
  await repo.keyword.save([
    repo.keyword.create({ organization_id: org1.id, term: 'AI short-form video', created_by: superAdmin.id }),
    repo.keyword.create({ organization_id: org1.id, term: 'Sustainable fashion', created_by: memberUser.id }),
    repo.keyword.create({ organization_id: org2.id, term: 'Faceless channels', created_by: memberUser.id }),
  ])
  console.log('  ✅ 3 keywords')

  console.log('🌱 Seed complete!')
  await ds.destroy()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

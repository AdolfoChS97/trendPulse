import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, OneToMany, ManyToOne, JoinColumn,
} from 'typeorm'

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text', unique: true })
  slug: string

  @Column({ type: 'text', default: 'individual' })
  type: 'individual' | 'company' | 'agency'

  @Column({ type: 'text', default: 'explorer' })
  tier: 'explorer' | 'creator' | 'business' | 'agency'

  @Column({ type: 'text', nullable: true })
  avatar_url: string | null

  @Column({ default: false })
  onboarding_completed: boolean

  @Column({ default: 1 })
  onboarding_step: number

  @OneToMany(() => OrganizationMember, (m) => m.organization)
  members: OrganizationMember[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

@Entity('organization_members')
export class OrganizationMember {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Organization, (o) => o.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization

  @Column({ type: 'uuid' })
  organization_id: string

  @Column({ type: 'uuid' })
  user_id: string

  @ManyToOne(() => OrganizationRole, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: OrganizationRole

  @Column({ type: 'uuid' })
  role_id: string

  @CreateDateColumn()
  joined_at: Date

  @Column({ type: 'uuid', nullable: true })
  invited_by: string | null
}

@Entity('organization_roles')
export class OrganizationRole {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization

  @Column({ type: 'uuid' })
  organization_id: string

  @Column({ type: 'text' })
  name: string

  @Column({ default: false })
  is_system: boolean

  @CreateDateColumn()
  created_at: Date

  @OneToMany(() => OrganizationRolePermission, (p) => p.role)
  permissions: OrganizationRolePermission[]
}

@Entity('organization_role_permissions')
export class OrganizationRolePermission {
  @Column({ type: 'uuid', primary: true })
  role_id: string

  @Column({ type: 'uuid', primary: true })
  permission_id: string

  @ManyToOne(() => OrganizationRole, (r) => r.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: OrganizationRole

  @ManyToOne(() => Permission, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id' })
  permission: Permission
}

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  resource: string

  @Column({ type: 'text' })
  action: string

  @Column({ type: 'text', nullable: true })
  description: string | null
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', unique: true })
  email: string

  @Column({ type: 'text', nullable: true })
  name: string

  @Column({ type: 'text', nullable: true })
  google_id: string

  @Column({ type: 'text', default: 'user' })
  platform_role: string

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date
}

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text', unique: true })
  slug: string

  @Column({ type: 'text', default: 'individual' })
  type: string

  @Column({ type: 'text', default: 'explorer' })
  tier: string

  @Column({ type: 'text', nullable: true })
  avatar_url: string

  @Column({ type: 'boolean', default: false })
  onboarding_completed: boolean

  @Column({ type: 'int', default: 1 })
  onboarding_step: number

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date
}

@Entity('organization_members')
export class OrganizationMember {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  organization_id: string

  @Column({ type: 'uuid' })
  user_id: string

  @Column({ type: 'uuid' })
  role_id: string

  @Column({ type: 'uuid', nullable: true })
  invited_by: string

  @CreateDateColumn({ type: 'timestamptz' })
  joined_at: Date
}

@Entity('organization_roles')
export class OrganizationRole {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  organization_id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'boolean', default: false })
  is_system: boolean

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date
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
  description: string
}

@Entity('keywords')
export class Keyword {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  organization_id: string

  @Column({ type: 'text' })
  term: string

  @Column({ type: 'uuid' })
  created_by: string

  @Column({ type: 'boolean', default: true })
  active: boolean

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date
}

@Entity('keyword_platforms')
export class KeywordPlatform {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  keyword_id: string

  @Column({ type: 'text' })
  platform: string

  @Column({ type: 'boolean', default: true })
  enabled: boolean
}

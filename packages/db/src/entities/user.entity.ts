import 'reflect-metadata'
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', unique: true })
  email: string

  @Column({ type: 'text', nullable: true })
  name: string | null

  @Column({ type: 'text', unique: true, nullable: true })
  google_id: string | null

  @Column({ type: 'text', nullable: true })
  avatar_url: string | null

  @Column({ type: 'text', default: 'user' })
  platform_role: 'super_admin' | 'admin' | 'support' | 'user'

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

@Entity('platform_credentials')
export class PlatformCredential {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  organization_id: string

  @Column({ type: 'text' })
  platform: 'x' | 'youtube' | 'instagram' | 'tiktok' | 'twitch'

  @Column({ type: 'text', nullable: true })
  platform_user_id: string | null

  @Column({ type: 'text' })
  access_token: string

  @Column({ type: 'text', nullable: true })
  refresh_token: string | null

  @Column({ type: 'timestamptz', nullable: true })
  token_expires_at: Date | null

  @Column({ type: 'text', array: true, nullable: true })
  scopes: string[] | null

  @Column({ type: 'uuid' })
  connected_by: string

  @CreateDateColumn()
  connected_at: Date
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

  @Column({ default: true })
  active: boolean

  @CreateDateColumn()
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

  @Column({ default: true })
  enabled: boolean
}

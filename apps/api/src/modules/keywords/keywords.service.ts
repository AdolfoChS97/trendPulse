import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Keyword, KeywordPlatform } from '../../entities'

@Injectable()
export class KeywordsService {
  constructor(
    @InjectRepository(Keyword)
    private keywordRepo: Repository<Keyword>,
    @InjectRepository(KeywordPlatform)
    private platformRepo: Repository<KeywordPlatform>,
  ) {}

  async findByOrg(organizationId: string) {
    return this.keywordRepo.find({
      where: { organization_id: organizationId, active: true },
      order: { created_at: 'DESC' },
    })
  }

  async findOne(id: string) {
    const kw = await this.keywordRepo.findOne({ where: { id } })
    if (!kw) throw new NotFoundException('Keyword not found')
    return kw
  }

  async create(organizationId: string, term: string, createdBy: string) {
    const kw = this.keywordRepo.create({ organization_id: organizationId, term, created_by: createdBy })
    const saved = await this.keywordRepo.save(kw)

    // Create platform entries for all 5 platforms
    const platforms: Array<'x' | 'youtube' | 'instagram' | 'tiktok' | 'twitch'> = [
      'x', 'youtube', 'instagram', 'tiktok', 'twitch',
    ]
    const entries = platforms.map((p) =>
      this.platformRepo.create({ keyword_id: saved.id, platform: p, enabled: true }),
    )
    await this.platformRepo.save(entries)

    return saved
  }

  async delete(id: string) {
    const kw = await this.findOne(id)
    kw.active = false
    return this.keywordRepo.save(kw)
  }
}

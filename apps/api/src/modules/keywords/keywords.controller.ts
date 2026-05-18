import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Keyword, KeywordPlatform } from '../../entities'

@Controller('keywords')
export class KeywordsController {
  constructor(
    @InjectRepository(Keyword)
    private keywordRepo: Repository<Keyword>,
    @InjectRepository(KeywordPlatform)
    private platformRepo: Repository<KeywordPlatform>,
  ) {}

  @Get()
  async findAll() {
    return this.keywordRepo.find({ where: { active: true }, order: { created_at: 'DESC' } })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.keywordRepo.findOne({ where: { id } })
  }

  @Post()
  async create(@Body() body: { term: string }) {
    const kw = this.keywordRepo.create({
      organization_id: '00000000-0000-0000-0000-aaaaaaaa0001',
      term: body.term,
      created_by: '00000000-0000-0000-0000-000000000001',
    })
    const saved = await this.keywordRepo.save(kw)

    const platforms: Array<'x' | 'youtube' | 'instagram' | 'tiktok' | 'twitch'> = ['x', 'youtube', 'instagram', 'tiktok', 'twitch']
    await this.platformRepo.save(platforms.map((p) => this.platformRepo.create({ keyword_id: saved.id, platform: p, enabled: true })))

    return saved
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const kw = await this.keywordRepo.findOne({ where: { id } })
    if (kw) { kw.active = false; return this.keywordRepo.save(kw) }
    return null
  }
}

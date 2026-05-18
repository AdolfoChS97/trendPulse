import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Keyword, KeywordPlatform } from '../../entities'
import { KeywordsController } from './keywords.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Keyword, KeywordPlatform])],
  controllers: [KeywordsController],
})
export class KeywordsModule {}

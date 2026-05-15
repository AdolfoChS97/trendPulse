<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTrends } from '@/composables/useTrends'
import { useI18n } from '@/plugins/i18n'
import PlatformBadge from '@/components/dashboard/PlatformBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { keywords, getScoreClass, getScoreLabel, getSnapshots } = useTrends()

const keywordId = route.params.id as string
const keyword = ref(keywords.value.find((k) => k.id === keywordId))
const snapshots = ref<Array<{ date: string; score: number; volume: number; platform: string }>>([])

onMounted(async () => {
  if (!keyword.value) { router.push({ name: 'dashboard' }); return }
  snapshots.value = await getSnapshots(keywordId)
})

const platforms: Array<'x' | 'youtube' | 'instagram' | 'tiktok' | 'twitch'> = ['x', 'youtube', 'instagram', 'tiktok', 'twitch']

function getPlatformScore(platform: string): number {
  return keyword.value?.platforms?.find((p: any) => p.platform === platform)?.score ?? 0
}

const scoreLabels: Record<number, string> = { 20: 'score_low', 40: 'score_moderate', 60: 'score_growing', 80: 'score_strong', 100: 'score_explosive' }
function scoreLabel(score: number): string {
  for (const [threshold, label] of Object.entries(scoreLabels)) {
    if (score <= Number(threshold)) return t(`keyword.${label}`)
  }
  return t('keyword.score_explosive')
}
</script>

<template>
  <div v-if="keyword" class="flex flex-col gap-5">
    <div class="flex items-center gap-3">
      <BaseButton variant="ghost" @click="router.push({ name: 'dashboard' })">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </BaseButton>
      <div>
        <h1 class="text-lg font-bold text-text-primary">{{ keyword.term }}</h1>
        <p class="text-xs text-text-secondary">5 {{ t('keyword.platforms_monitored') }}</p>
      </div>
    </div>

    <div class="card">
      <div class="flex items-end justify-between mb-4">
        <div>
          <p class="text-xs text-text-secondary uppercase tracking-wider mb-1">{{ t('keyword.score_label') }}</p>
          <div class="flex items-baseline gap-2">
            <span :class="['metric-number text-3xl', getScoreClass(keyword.trendScore)]">{{ keyword.trendScore }}</span>
            <span class="text-sm text-text-secondary">/ 100</span>
          </div>
        </div>
        <div class="pill" :class="{
          'bg-success-muted text-success border border-success': keyword.trendScore > 60,
          'bg-warning-muted text-warning border border-warning': keyword.trendScore > 80,
          'bg-brand-100 text-brand-400 border border-brand-400': keyword.trendScore <= 60,
        }">{{ scoreLabel(keyword.trendScore) }}</div>
      </div>

      <div class="w-full h-2 bg-bg-primary rounded-full overflow-hidden mb-4">
        <div class="h-full rounded-full transition-all duration-700" :class="{ 'bg-success': keyword.trendScore > 60, 'bg-warning': keyword.trendScore > 80 }" :style="{ width: `${Math.min(keyword.trendScore, 100)}%`, background: keyword.trendScore > 60 ? 'var(--gradient-success)' : undefined }" />
      </div>

      <div class="grid grid-cols-3 gap-2 text-center">
        <div><p class="metric-number text-sm text-text-primary">{{ keyword.trendScore * 100 || 0 }}</p><p class="text-[10px] text-text-muted">{{ t('keyword.mentions') }}</p></div>
        <div><p class="metric-number text-sm trend-up">+{{ keyword.platforms[0]?.growthRate || 0 }}%</p><p class="text-[10px] text-text-muted">{{ t('keyword.growth') }}</p></div>
        <div><p class="metric-number text-sm text-text-secondary">5</p><p class="text-[10px] text-text-muted">{{ t('keyword.platforms') }}</p></div>
      </div>
    </div>

    <h2 class="text-sm font-semibold text-text-secondary uppercase tracking-wider">{{ t('keyword.by_platform') }}</h2>

    <div class="flex flex-col gap-2">
      <div v-for="platform in platforms" :key="platform" class="card flex items-center justify-between py-3 px-4">
        <PlatformBadge :platform="platform" />
        <div class="flex items-center gap-4">
          <div class="w-24 h-1.5 bg-bg-primary rounded-full overflow-hidden">
            <div class="h-full rounded-full" :style="{ width: `${Math.min(getPlatformScore(platform), 100)}%`, background: `var(--color-platform-${platform})` }" />
          </div>
          <span class="metric-number text-sm text-text-primary w-8 text-right">{{ getPlatformScore(platform) }}</span>
        </div>
      </div>
    </div>

    <BaseButton variant="ghost" @click="router.push({ name: 'dashboard' })" class="text-text-muted hover:text-error mt-4">
      {{ t('keyword.stop_monitoring') }}
    </BaseButton>
  </div>
</template>

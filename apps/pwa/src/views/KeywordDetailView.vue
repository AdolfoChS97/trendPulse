<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTrends } from '@/composables/useTrends'
import PlatformBadge from '@/components/dashboard/PlatformBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const { keywords, getScoreClass, getScoreLabel, getSnapshots } = useTrends()

const keywordId = route.params.id as string
const keyword = ref(keywords.value.find((k) => k.id === keywordId))
const snapshots = ref<Array<{ date: string; score: number; volume: number; platform: string }>>([])

onMounted(async () => {
  if (!keyword.value) {
    // Fallback if not loaded
    router.push({ name: 'dashboard' })
    return
  }

  snapshots.value = await getSnapshots(keywordId)
})

function goBack() {
  router.push({ name: 'dashboard' })
}

const platforms: Array<'x' | 'youtube' | 'instagram' | 'tiktok' | 'twitch'> = [
  'x', 'youtube', 'instagram', 'tiktok', 'twitch',
]
</script>

<template>
  <div v-if="keyword" class="flex flex-col gap-5">
    <div class="flex items-center gap-3">
      <BaseButton variant="ghost" @click="goBack">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </BaseButton>
      <div>
        <h1 class="text-lg font-bold text-text-primary">{{ keyword.term }}</h1>
        <p class="text-xs text-text-secondary">5 platforms monitored</p>
      </div>
    </div>

    <!-- Score Card -->
    <div class="card">
      <div class="flex items-end justify-between mb-4">
        <div>
          <p class="text-xs text-text-secondary uppercase tracking-wider mb-1">Trend Score</p>
          <div class="flex items-baseline gap-2">
            <span :class="['metric-number text-3xl', getScoreClass(keyword.trendScore)]">
              {{ keyword.trendScore }}
            </span>
            <span class="text-sm text-text-secondary">/ 100</span>
          </div>
        </div>
        <div class="pill" :class="{
          'bg-success-muted text-success border border-success': keyword.trendScore > 60,
          'bg-warning-muted text-warning border border-warning': keyword.trendScore > 80,
          'bg-brand-100 text-brand-400 border border-brand-400': keyword.trendScore <= 60,
        }">
          {{ getScoreLabel(keyword.trendScore) }}
        </div>
      </div>

      <!-- Score bar -->
      <div class="w-full h-2 bg-bg-primary rounded-full overflow-hidden mb-4">
        <div
          class="h-full rounded-full transition-all duration-700"
          :class="{
            'bg-success': keyword.trendScore > 60,
            'bg-warning': keyword.trendScore > 80,
          }"
          :style="{
            width: `${Math.min(keyword.trendScore, 100)}%`,
            background: keyword.trendScore > 60
              ? 'var(--gradient-success)'
              : undefined,
          }"
        />
      </div>

      <div class="grid grid-cols-3 gap-2 text-center">
        <div>
          <p class="metric-number text-sm text-text-primary">
            {{ keyword.trendScore * 100 || 0 }}
          </p>
          <p class="text-[10px] text-text-muted">Mentions (24h)</p>
        </div>
        <div>
          <p class="metric-number text-sm trend-up">
            +{{ keyword.platforms[0]?.growthRate || 0 }}%
          </p>
          <p class="text-[10px] text-text-muted">Growth Rate</p>
        </div>
        <div>
          <p class="metric-number text-sm text-text-secondary">5</p>
          <p class="text-[10px] text-text-muted">Platforms</p>
        </div>
      </div>
    </div>

    <!-- Platform Scores -->
    <h2 class="text-sm font-semibold text-text-secondary uppercase tracking-wider">
      By Platform
    </h2>

    <div class="flex flex-col gap-2">
      <div
        v-for="platform in platforms"
        :key="platform"
        class="card flex items-center justify-between py-3 px-4"
      >
        <PlatformBadge :platform="platform" />

        <div class="flex items-center gap-4">
          <div class="w-24 h-1.5 bg-bg-primary rounded-full overflow-hidden">
            <div
              class="h-full rounded-full"
              :style="{
                width: `${Math.min(getPlatformScore(platform), 100)}%`,
                background: `var(--color-platform-${platform})`,
              }"
            />
          </div>
          <span class="metric-number text-sm text-text-primary w-8 text-right">
            {{ getPlatformScore(platform) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Deleting -->
    <BaseButton
      variant="ghost"
      @click="router.push({ name: 'dashboard' })"
      class="text-text-muted hover:text-error mt-4"
    >
      Stop monitoring this keyword
    </BaseButton>
  </div>
</template>

<script lang="ts">
function getPlatformScore(this: void, platform: string): number {
  const k = (this as any).keyword
  if (!k) return 0
  const found = k.platforms?.find((p: any) => p.platform === platform)
  return found?.score ?? 0
}
</script>

<style scoped>
</style>

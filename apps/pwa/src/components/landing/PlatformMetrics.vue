<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '@/plugins/i18n'

const { t } = useI18n()

const platforms = [
  {
    id: 'x', name: 'X', score: 68, change: '+12%', volume: '2.4K', color: '#1DA1F2',
    icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    id: 'youtube', name: 'YouTube', score: 81, change: '+24%', volume: '5.1K', color: '#FF0000',
    icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    id: 'instagram', name: 'Instagram', score: 55, change: '+8%', volume: '3.8K', color: '#E1306C',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    id: 'tiktok', name: 'TikTok', score: 92, change: '+38%', volume: '8.7K', color: '#FF0050',
    icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    id: 'twitch', name: 'Twitch', score: 41, change: '+5%', volume: '1.2K', color: '#9146FF',
    icon: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z',
  },
]

const countUp = ref<number[]>(platforms.map(() => 0))
const hovered = ref<number | null>(null)
const selected = ref<number | null>(null)

onMounted(() => {
  setTimeout(() => {
    platforms.forEach((p, i) => {
      const target = p.score
      const dur = 1400 + i * 200
      const start = performance.now()
      function anim(now: number) {
        const pct = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - pct, 3)
        countUp.value[i] = Math.round(target * eased)
        if (pct < 1) requestAnimationFrame(anim)
      }
      requestAnimationFrame(anim)
    })
  }, 600)
})

function scoreColor(s: number) {
  if (s > 80) return '#F7B731'
  if (s > 60) return '#00E396'
  if (s > 40) return '#6C5CE7'
  return '#8A92A6'
}

function scoreLabel(s: number) {
  if (s > 80) return 'Explosive'
  if (s > 60) return 'Strong'
  if (s > 40) return 'Growing'
  if (s > 20) return 'Moderate'
  return 'Low'
}
</script>

<template>
  <div class="mt-5">
    <div class="flex items-center gap-2 mb-3">
      <div class="w-2 h-2 rounded-full bg-success animate-pulse" />
      <span class="text-[10px] font-medium text-text-secondary uppercase tracking-wider">{{ t('platform.live') }}</span>
    </div>

    <div class="flex flex-col">
      <button
        v-for="(p, i) in platforms"
        :key="p.id"
        class="group flex items-center gap-1.5 py-2.5 px-2 -mx-2 rounded-lg transition-all duration-200 cursor-pointer border border-transparent"
        :class="{
          'bg-bg-elevated border border-border-default scale-[1.02] shadow-md': hovered === i || selected === i,
        }"
        @mouseenter="hovered = i"
        @mouseleave="hovered = null"
        @click="selected = selected === i ? null : i"
      >
        <!-- Platform icon + name -->
        <div class="w-16 flex-shrink-0 flex items-center gap-1">
          <div
            class="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
            :class="{
              'scale-110 shadow-sm': hovered === i || selected === i,
            }"
            :style="{
              backgroundColor: `${p.color}18`,
            }"
          >
            <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor" :style="{ color: p.color }">
              <path :d="p.icon" />
            </svg>
          </div>
          <span
            class="text-[9px] font-medium truncate transition-colors duration-200"
            :class="hovered === i || selected === i ? 'text-text-primary' : 'text-text-muted'"
          >
            {{ p.name }}
          </span>
        </div>

        <!-- Score bar -->
        <div class="flex-1 h-1.5 bg-bg-primary rounded-full overflow-hidden min-w-0">
          <div
            class="h-full rounded-full transition-all duration-500"
            :class="{
              'opacity-80': hovered !== i && hovered !== null,
            }"
            :style="{
              width: `${countUp[i]}%`,
              backgroundColor: p.color,
              boxShadow: hovered === i || selected === i ? `0 0 8px ${p.color}40` : 'none',
            }"
          />
        </div>

        <!-- Score -->
        <span
          class="text-[9px] font-mono font-semibold w-6 text-right flex-shrink-0 transition-all duration-200"
          :class="hovered === i || selected === i ? 'scale-110' : ''"
          :style="{ color: scoreColor(p.score) }"
        >
          {{ countUp[i] }}
        </span>

        <!-- Change -->
        <span
          class="text-[9px] font-mono font-medium w-10 text-right flex-shrink-0 transition-all duration-200"
          :class="[
            p.change.startsWith('+') ? 'text-success' : 'text-error',
            hovered === i || selected === i ? 'scale-105' : '',
          ]"
        >
          {{ p.change }}
        </span>

        <!-- Volume -->
        <span
          class="text-[9px] font-mono text-text-muted w-9 text-right flex-shrink-0 transition-all duration-200"
          :class="hovered === i || selected === i ? 'text-text-secondary' : ''"
        >
          {{ p.volume }}
        </span>
      </button>
    </div>

    <!-- Selected platform detail -->
    <div
      v-if="selected !== null"
      class="mt-3 bg-bg-elevated border border-border-default rounded-lg p-3 transition-all duration-300"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-[10px] font-semibold text-text-primary mb-1">
            {{ platforms[selected].name }} — Trend Score {{ platforms[selected].score }}/100
            <span class="font-normal font-mono" :style="{ color: scoreColor(platforms[selected].score) }">({{ scoreLabel(platforms[selected].score) }})</span>
          </p>
          <div class="grid grid-cols-3 gap-3 text-center">
            <div>
              <p class="text-xs font-mono font-semibold text-text-primary">{{ platforms[selected].volume }}</p>
              <p class="text-[9px] text-text-muted">Volume</p>
            </div>
            <div>
              <p class="text-xs font-mono font-semibold" :class="platforms[selected].change.startsWith('+') ? 'text-success' : 'text-error'">{{ platforms[selected].change }}</p>
              <p class="text-[9px] text-text-muted">Growth</p>
            </div>
            <div>
              <p class="text-xs font-mono font-semibold text-text-primary">24h</p>
              <p class="text-[9px] text-text-muted">Window</p>
            </div>
          </div>
          <!-- Mini sparkline -->
          <div class="mt-2 h-8 rounded">
            <svg class="w-full h-full" viewBox="0 0 100 32" fill="none">
              <path :d="`M0 28 L20 ${28 - (platforms[selected].score * 0.25)} L40 ${28 - (platforms[selected].score * 0.2)} L60 ${28 - (platforms[selected].score * 0.28)} L80 ${28 - (platforms[selected].score * 0.22)} L100 ${28 - (platforms[selected].score * 0.3)}`" :stroke="platforms[selected].color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <circle :cx="100" :cy="28 - (platforms[selected].score * 0.3)" r="2.5" :fill="platforms[selected].color" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

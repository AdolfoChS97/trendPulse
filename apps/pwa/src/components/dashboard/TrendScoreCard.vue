<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  score: number
  keyword: string
  isEmerging?: boolean
}>()

const scoreClass = computed(() => {
  if (props.score <= 20) return 'score-0-20'
  if (props.score <= 40) return 'score-21-40'
  if (props.score <= 60) return 'score-41-60'
  if (props.score <= 80) return 'score-61-80'
  return 'score-81-100'
})

const statusLabel = computed(() => {
  if (props.score <= 20) return 'Low Interest'
  if (props.score <= 40) return 'Moderate'
  if (props.score <= 60) return 'Trending'
  if (props.score <= 80) return 'Strong'
  return 'Explosive'
})

const progressPercent = computed(() => Math.min(props.score, 100))
</script>

<template>
  <div
    :class="['card relative', { 'card-active': isEmerging }]"
  >
    <div v-if="isEmerging" class="pill badge-emerging absolute top-3 right-3">
      ⚡ Trending
    </div>

    <div class="flex flex-col gap-3">
      <h3 class="text-text-primary text-sm font-semibold truncate pr-20">
        {{ keyword }}
      </h3>

      <div class="flex items-baseline gap-2">
        <span :class="['metric-number text-2xl', scoreClass]">
          {{ score }}
        </span>
        <span class="text-xs text-text-secondary font-medium">
          {{ statusLabel }}
        </span>
      </div>

      <div class="w-full h-1.5 bg-bg-primary rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500"
          :class="scoreClass"
          :style="{
            width: `${progressPercent}%`,
            background: isEmerging
              ? 'var(--gradient-success)'
              : undefined,
          }"
        />
      </div>

      <slot name="platforms" />
    </div>
  </div>
</template>

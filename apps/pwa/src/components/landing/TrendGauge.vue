<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  score?: number
  label?: string
}>(), {
  score: 72,
  label: 'Strong',
})

const displayScore = ref(0)
const needleAngle = ref(-90)

function scoreToAngle(s: number): number {
  return -90 + (s / 100) * 180
}

function startAnimation() {
  const target = props.score
  const duration = 1800
  const start = performance.now()

  function animate(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayScore.value = Math.round(target * eased)
    needleAngle.value = scoreToAngle(target * eased)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  setTimeout(startAnimation, 300)
})
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- Canvas for gauge arc + needle -->
    <div class="relative w-48 h-32 overflow-hidden">
      <!-- Arc background -->
      <svg class="w-full h-full" viewBox="0 0 192 100">
        <!-- Background arc -->
        <path
          d="M 16 96 A 80 80 0 0 1 176 96"
          fill="none"
          stroke="#252D3E"
          stroke-width="12"
          stroke-linecap="round"
        />
        <!-- Colored arc (0-100) -->
        <path
          d="M 16 96 A 80 80 0 0 1 176 96"
          fill="none"
          stroke="url(#gauge-grad)"
          stroke-width="12"
          stroke-linecap="round"
          stroke-dasharray="252"
          :stroke-dashoffset="252 - (252 * displayScore) / 100"
          style="transition: stroke-dashoffset 0.1s ease"
        />

        <!-- Needle -->
        <line
          x1="96"
          y1="96"
          x2="96"
          y2="20"
          stroke="#ECEFF4"
          stroke-width="2"
          stroke-linecap="round"
          :transform="`rotate(${needleAngle}, 96, 96)`"
          style="transition: transform 0.1s ease"
        />
        <!-- Needle center dot -->
        <circle cx="96" cy="96" r="4" fill="#ECEFF4" />
        <circle cx="96" cy="96" r="8" fill="#00E396" opacity="0.12" />

        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#FF6B6B" />
            <stop offset="30%" stop-color="#F7B731" />
            <stop offset="60%" stop-color="#6C5CE7" />
            <stop offset="100%" stop-color="#00E396" />
          </linearGradient>
        </defs>

        <!-- Scale marks -->
        <text x="7" y="102" fill="#4E5668" font-size="8" font-family="Inter,sans-serif">0</text>
        <text x="82" y="78" fill="#4E5668" font-size="8" font-family="Inter,sans-serif">50</text>
        <text x="170" y="102" fill="#4E5668" font-size="8" font-family="Inter,sans-serif">100</text>
      </svg>
    </div>

    <!-- Score number -->
    <div class="mt-1 text-center">
      <span class="font-mono text-3xl font-bold text-text-primary" style="font-variant-numeric:tabular-nums">
        {{ displayScore }}
      </span>
    </div>

    <!-- Label -->
    <span
      class="text-xs font-medium mt-1"
      :class="{
        'text-success': displayScore > 60,
        'text-warning': displayScore > 80,
        'text-brand-400': displayScore <= 60,
      }"
    >
      {{ label }}
    </span>
  </div>
</template>

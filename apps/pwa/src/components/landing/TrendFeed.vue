<script setup lang="ts">
import MiniChart from './MiniChart.vue'

const trends = [
  { topic: 'AI Short-Form Video', change: '+340%', hot: true },
  { topic: 'Faceless Channels', change: '+215%', hot: true },
  { topic: 'Vlog Comeback', change: '+89%', hot: false },
  { topic: 'Niche Newsletters', change: '+67%', hot: false },
  { topic: 'UGC Portfolios', change: '+52%', hot: false },
]
</script>

<template>
  <div class="bg-bg-surface border border-border-default rounded-xl p-5 w-full max-w-sm">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span class="text-xs font-medium text-text-secondary">LIVE TRENDS</span>
      </div>
      <span class="text-[10px] text-text-muted">Updated now</span>
    </div>

    <!-- Trend list -->
    <div class="flex flex-col gap-3">
      <div
        v-for="(t, i) in trends"
        :key="t.topic"
        class="flex items-center justify-between"
      >
        <div class="flex items-center gap-2 min-w-0">
          <span class="text-[10px] font-mono text-text-muted w-5 text-right">{{ i + 1 }}</span>
          <span class="text-xs text-text-primary truncate">{{ t.topic }}</span>
        </div>
        <span
          class="text-xs font-mono font-semibold flex-shrink-0 ml-2"
          :class="t.hot ? 'text-success' : 'text-text-secondary'"
        >
          {{ t.change }}
        </span>
      </div>
    </div>

    <!-- Mini sparkline -->
    <div class="mt-4 pt-3 border-t border-border-default">
      <MiniChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import BaseButton from '@/components/ui/BaseButton.vue'

const { isExplorer } = useAuth()
</script>

<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-lg font-bold text-text-primary">AI Insights</h1>

    <div v-if="isExplorer" class="card text-center py-10">
      <svg class="w-12 h-12 mx-auto mb-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <h2 class="text-text-primary font-semibold mb-1">AI Insights</h2>
      <p class="text-text-secondary text-sm mb-4 max-w-xs mx-auto">
        Get AI-powered trend analysis and recommendations. Available from Creator plan.
      </p>
      <BaseButton>
        Upgrade to Creator — $9.99/mo
      </BaseButton>
    </div>

    <div v-else class="flex flex-col gap-3">
      <div class="card">
        <p class="text-xs text-text-muted uppercase tracking-wider mb-2">
          Auto-generated for you
        </p>
        <p class="text-sm text-text-primary leading-relaxed">
          Insights will appear here automatically when our AI engine analyzes your
          monitored keywords. You'll receive trend analysis, content suggestions,
          and audience behavior patterns.
        </p>
      </div>
      <p class="text-xs text-text-muted text-center">
        Insights update every 6 hours
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/plugins/i18n'

const { t } = useI18n()
</script>

<template>
  <div class="mt-3">
    <div class="bg-warning-muted border border-warning rounded-lg px-3 py-2.5">
      <div class="flex items-start gap-2">
        <svg class="w-3.5 h-3.5 text-warning flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        <div>
          <p class="text-[10px] font-semibold text-warning mb-0.5">{{ t('alert.emerging') }}</p>
          <p class="text-[9px] text-text-secondary leading-relaxed">AI Short-Form Video {{ t('alert.prediction') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

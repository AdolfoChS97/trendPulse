<script setup lang="ts">
import { useI18n } from '@/plugins/i18n'
import { computed } from 'vue'

defineEmits<{ login: [] }>()

const { t } = useI18n()
</script>

<template>
  <section class="px-6 py-16 md:px-12 md:py-24 lg:px-24 text-center">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold text-text-primary md:text-4xl">
        {{ t('final.title') }}
      </h2>
      <p class="text-sm text-text-secondary mt-2 mb-6 md:text-base md:mb-8">
        {{ t('final.subtitle') }}
      </p>

      <button
        @click="$emit('login')"
        class="inline-flex items-center gap-2 bg-white text-gray-900 rounded-lg px-6 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors md:px-8 md:py-3.5 md:text-base"
      >
        <svg class="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        {{ t('final.start') }}
      </button>

      <p class="text-[10px] text-text-muted mt-3 md:text-xs">
        {{ t('final.nocc') }}
      </p>

      <div class="flex items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12 pt-8 border-t border-border-default">
        <a href="/pricing" class="text-xs text-text-muted hover:text-text-secondary transition-colors md:text-sm">{{ t('nav.pricing') }}</a>
        <a href="#" class="text-xs text-text-muted hover:text-text-secondary transition-colors md:text-sm">Terms</a>
        <a href="#" class="text-xs text-text-muted hover:text-text-secondary transition-colors md:text-sm">Privacy</a>
      </div>

      <p class="text-[10px] text-text-muted mt-4 md:text-xs">
        Made for entrepreneurs, creators, and businesses.
      </p>
    </div>
  </section>
</template>

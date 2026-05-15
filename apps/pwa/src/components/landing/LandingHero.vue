<script setup lang="ts">
import TrendGauge from './TrendGauge.vue'
import PlatformMetrics from './PlatformMetrics.vue'
import { useI18n } from '@/plugins/i18n'
import { computed } from 'vue'

defineEmits<{ login: [] }>()

const { t } = useI18n()

// Computed text using i18n with fallback to English
const heroHeadline = computed(() => t('hero.headline'))
const heroGrad = computed(() => t('hero.headline_gradient'))
const heroSub = computed(() => t('hero.subtitle'))
const heroSub2 = computed(() => t('hero.subtitle2'))
</script>

<template>
  <section class="relative px-6 pt-12 pb-8 md:px-12 md:pt-16 md:pb-12 lg:px-24 lg:pt-20">
    <div class="max-w-6xl mx-auto">
      <!-- Hero content — two columns on desktop -->
      <div class="md:flex md:items-center md:gap-16 lg:gap-24">
        <!-- Left: text -->
        <div class="md:flex-1 md:max-w-xl">
          <h1 class="text-3xl font-bold text-text-primary leading-tight md:text-5xl lg:text-6xl">
            {{ heroHeadline }}<br />
            <span class="bg-gradient-to-r from-brand-400 to-[#00D2FF] bg-clip-text text-transparent">
              {{ heroGrad }}
            </span>
          </h1>

          <p class="text-sm text-text-secondary mt-4 leading-relaxed md:text-base md:mt-6 max-w-md">
            {{ heroSub }}
          </p>
          <p class="text-xs text-text-muted mt-1 md:text-sm">
            {{ heroSub2 }}
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-6 md:mt-8">
            <button
              @click="$emit('login')"
              class="flex items-center gap-2 bg-white text-gray-900 rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              {{ t('hero.cta') }}
            </button>
            <a
              href="#how-it-works"
              class="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              {{ t('hero.cta2') }} ↓
            </a>
          </div>

          <p class="text-[10px] text-text-muted mt-3 md:text-xs md:mt-4">
            {{ t('hero.nocc') }}
          </p>

          <!-- Social proof (desktop) -->
          <div class="hidden md:block mt-8 pt-8 border-t border-border-default">
            <p class="text-xs text-text-muted uppercase tracking-wider font-medium">
              {{ t('hero.social') }}
            </p>
            <div class="flex items-center gap-1 mt-2">
              <span v-for="i in 5" :key="i" class="text-warning text-sm">★</span>
              <span class="text-xs text-text-secondary ml-1">4.9/5</span>
            </div>
          </div>
        </div>

        <!-- Right: Dashboard mockup -->
        <div class="mt-10 md:mt-0 md:flex-1 md:flex md:justify-center">
          <div class="bg-gradient-to-b from-bg-elevated to-bg-surface border border-border-default rounded-2xl p-5 shadow-lg w-full max-w-sm md:max-w-none md:w-96 lg:w-[420px]">
            <!-- Mock header bar -->
            <div class="flex items-center justify-between mb-5">
              <div class="flex gap-1">
                <div class="w-2 h-2 rounded-full bg-error/40" />
                <div class="w-2 h-2 rounded-full bg-warning/40" />
                <div class="w-2 h-2 rounded-full bg-success/40" />
              </div>
              <span class="text-[10px] text-text-muted font-mono">TrendPulse v1</span>
            </div>

            <!-- Gauge row -->
            <div class="flex justify-center mb-5">
              <TrendGauge :score="72" label="Trending Strong" />
            </div>

            <!-- Platform metrics (key change: shows all 5 platforms) -->
            <PlatformMetrics />

            <!-- Alert card -->
            <div class="mt-3">
              <div class="bg-warning-muted border border-warning rounded-lg px-3 py-2.5">
                <div class="flex items-start gap-2">
                  <svg class="w-3.5 h-3.5 text-warning flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  <div>
                    <p class="text-[10px] font-semibold text-warning mb-0.5">Emerging Trend Alert</p>
                    <p class="text-[9px] text-text-secondary leading-relaxed">AI Short-Form Video is accelerating. Predicted +340% in 48h.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Social proof (mobile) -->
      <div class="md:hidden mt-10 text-center">
        <p class="text-[11px] text-text-muted uppercase tracking-wider font-medium">
          {{ t('hero.social') }}
        </p>
        <div class="flex items-center justify-center gap-1 mt-3">
          <span v-for="i in 5" :key="i" class="text-warning text-xs">★</span>
          <span class="text-xs text-text-secondary ml-1">4.9/5</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/plugins/i18n'
import { computed } from 'vue'

const { t } = useI18n()

const steps = computed(() => [
  { num: '1.0', title: t('how.step1_title'), desc: t('how.step1_desc'), visual: 'Monitor dashboard screenshot' },
  { num: '2.0', title: t('how.step2_title'), desc: t('how.step2_desc'), visual: 'Detection metrics screenshot' },
  { num: '3.0', title: t('how.step3_title'), desc: t('how.step3_desc'), visual: 'Prediction chart screenshot' },
  { num: '4.0', title: t('how.step4_title'), desc: t('how.step4_desc'), visual: 'Action suggestions screenshot' },
])
</script>

<template>
  <section id="how-it-works" class="px-6 py-16 md:px-12 md:py-24 lg:px-24">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold text-text-primary text-center md:text-4xl">
        {{ t('how.title') }}
      </h2>
      <p class="text-sm text-text-secondary text-center mt-2 mb-12 md:text-base md:mb-20">
        {{ t('how.subtitle') }}
      </p>

      <!-- Desktop: 4 columns -->
      <div class="hidden md:grid md:grid-cols-4 md:gap-8 lg:gap-12">
        <div v-for="(s, i) in steps" :key="s.num" class="flex flex-col">
          <div class="w-10 h-10 rounded-lg bg-brand-100 border border-brand-400 flex items-center justify-center mb-4">
            <span class="text-xs font-bold font-mono text-brand-400">{{ i + 1 }}</span>
          </div>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-[11px] font-mono text-brand-400 font-semibold">{{ s.num }}</span>
            <h3 class="text-base font-semibold text-text-primary">{{ s.title }}</h3>
          </div>
          <p class="text-sm text-text-secondary leading-relaxed flex-1">{{ s.desc }}</p>
          <div class="mt-6 h-32 rounded-lg bg-bg-elevated border border-border-default flex items-center justify-center">
            <span class="text-xs text-text-muted italic">{{ s.visual }}</span>
          </div>
        </div>
      </div>

      <!-- Mobile: vertical flow -->
      <div class="md:hidden flex flex-col gap-10 max-w-sm mx-auto">
        <div v-for="(s, i) in steps" :key="s.num" class="flex gap-5">
          <div class="flex flex-col items-center flex-shrink-0">
            <div class="w-10 h-10 rounded-lg bg-brand-100 border border-brand-400 flex items-center justify-center">
              <span class="text-xs font-bold font-mono text-brand-400">{{ i + 1 }}</span>
            </div>
            <div v-if="i < steps.length - 1" class="w-px h-full bg-border-default mt-2" />
          </div>
          <div class="pb-6">
            <div class="flex items-baseline gap-2 mb-1">
              <span class="text-[11px] font-mono text-brand-400 font-semibold">{{ s.num }}</span>
              <h3 class="text-base font-semibold text-text-primary">{{ s.title }}</h3>
            </div>
            <p class="text-sm text-text-secondary leading-relaxed">{{ s.desc }}</p>
            <div class="mt-4 h-20 rounded-lg bg-bg-elevated border border-border-default flex items-center justify-center">
              <span class="text-xs text-text-muted italic">{{ s.visual }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

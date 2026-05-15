<script setup lang="ts">
import { useI18n } from '@/plugins/i18n'
import { computed } from 'vue'

const { t } = useI18n()

const testimonials = [
  {
    quoteKey: 'social.quote1',
    quote: 'Caught the short-form AI video trend 2 weeks before it peaked. Completely changed my content strategy.',
    name: 'Sarah Chen',
    role: 'Content Creator · 142K YouTube',
  },
  {
    quoteKey: 'social.quote2',
    quote: 'I use TrendPulse every morning before planning my TikTok content. It is like having a crystal ball.',
    name: 'Marcus Rivera',
    role: 'Influencer · 89K TikTok',
  },
  {
    quoteKey: 'social.quote3',
    quote: 'As a small business owner, knowing what products are trending before stocking them is a game-changer.',
    name: 'Elena Kowalski',
    role: 'Founder, Craft & Bloom',
  },
]

const stats = computed(() => [
  { value: '5,000+', label: t('social.stat1') },
  { value: '4.9', label: t('social.stat2') },
  { value: '3.2d', label: t('social.stat3') },
  { value: '5', label: t('social.stat4') },
])
</script>

<template>
  <section class="px-6 py-16 md:px-12 md:py-24 lg:px-24">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold text-text-primary text-center md:text-4xl">
        {{ t('social.title') }}
      </h2>
      <p class="text-sm text-text-secondary text-center mt-2 mb-10 md:text-base md:mb-16">
        {{ t('social.subtitle') }}
      </p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-sm md:max-w-4xl mx-auto mb-10 md:mb-16">
        <div v-for="s in stats" :key="s.label" class="card text-center py-5 md:py-8">
          <div class="text-xl md:text-3xl font-bold font-mono text-text-primary">{{ s.value }}</div>
          <div class="text-[10px] md:text-xs text-text-muted mt-1">{{ s.label }}</div>
        </div>
      </div>

      <div class="max-w-sm md:max-w-4xl mx-auto grid gap-4 md:grid-cols-3">
        <div v-for="tq in testimonials" :key="tq.name" class="card">
          <svg class="w-5 h-5 text-brand-400 mb-3 opacity-50" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z"/>
          </svg>
          <p class="text-sm text-text-primary leading-relaxed mb-4 md:text-base">"{{ tq.quote }}"</p>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400/50 to-brand-300/50 flex items-center justify-center text-xs font-bold text-white">{{ tq.name.charAt(0) }}</div>
            <div>
              <div class="text-xs font-semibold text-text-primary">{{ tq.name }}</div>
              <div class="text-[10px] text-text-muted">{{ tq.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

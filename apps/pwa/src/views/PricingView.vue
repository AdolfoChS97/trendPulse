<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '@/plugins/i18n'

const router = useRouter()
const { t } = useI18n()
const openFaq = ref<number | null>(0)

const plans = [
  { tier: 'explorer', features: [1, 2, 3, 4, 5], cta_key: 'pricing.start', highlight: false },
  { tier: 'creator', features: [1, 2, 3, 4, 5, 6, 7], cta_key: 'pricing.trial', highlight: true },
  { tier: 'business', features: [1, 2, 3, 4, 5, 6, 7], cta_key: 'pricing.trial', highlight: false },
  { tier: 'agency', features: [1, 2, 3, 4, 5, 6, 7], cta_key: 'pricing.contact', highlight: false },
]

const prices: Record<string, string> = { explorer: '$0', creator: '$9.99', business: '$29.99', agency: '$99.99' }
const periods: Record<string, string> = { explorer: 'pricing.forever', creator: 'pricing.mo', business: 'pricing.mo', agency: 'pricing.mo' }

const faqs = [1, 2, 3, 4, 5]

function goBack() { router.push({ name: 'login' }) }
</script>

<template>
  <div class="min-h-full px-6 py-10 md:px-12 md:py-16 lg:px-24">
    <div class="max-w-6xl mx-auto">
      <button @click="goBack" class="text-sm text-text-muted hover:text-text-secondary transition-colors flex items-center gap-1 mb-8">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
        {{ t('pricing.back') }}
      </button>

      <h1 class="text-2xl font-bold text-text-primary text-center mb-2 md:text-4xl">{{ t('pricing.title') }}</h1>
      <p class="text-sm text-text-secondary text-center mb-10 md:text-base md:mb-16">{{ t('pricing.subtitle') }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div v-for="plan in plans" :key="plan.tier" :class="['card flex flex-col gap-3 p-5 md:p-6', plan.highlight ? 'border-brand-400 shadow-glow-brand ring-1 ring-brand-400/20 md:scale-105 md:-mt-2 md:mb-2' : '']">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-sm font-semibold text-text-primary md:text-base">{{ t(`pricing.${plan.tier}`) }}</h3>
              <div class="flex items-baseline gap-1 mt-1">
                <span class="text-xl font-bold font-mono text-text-primary md:text-2xl">{{ prices[plan.tier] }}</span>
                <span class="text-xs text-text-muted">{{ t(periods[plan.tier]) }}</span>
              </div>
            </div>
            <span v-if="plan.highlight" class="pill bg-brand-100 text-brand-400 border border-brand-400/30 text-[10px] px-2 py-0.5">{{ t('pricing.most_popular') }}</span>
          </div>

          <ul class="space-y-1.5 flex-1">
            <li v-for="f in plan.features" :key="f" class="flex items-center gap-2 text-xs text-text-secondary md:text-sm">
              <svg class="w-3 h-3 text-success flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              {{ t(`pricing.feat${f}_${plan.tier}`) }}
            </li>
          </ul>

          <button :class="['mt-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all w-full text-center md:py-3 md:text-sm', plan.highlight ? 'bg-gradient-to-r from-brand-400 to-[#00D2FF] text-white hover:shadow-glow-brand' : 'border border-border-default text-text-secondary hover:border-brand-400 hover:text-text-primary']" @click="goBack">
            {{ t(plan.cta_key) }}
          </button>
        </div>
      </div>

      <div class="mt-12 md:mt-20 max-w-2xl mx-auto">
        <h2 class="text-lg font-bold text-text-primary text-center mb-6 md:text-2xl">{{ t('pricing.faq_title') }}</h2>
        <div class="flex flex-col gap-2">
          <div v-for="i in faqs" :key="i" :class="['card cursor-pointer transition-colors', openFaq === i ? 'border-brand-400' : '']" @click="openFaq = openFaq === i ? null : i">
            <div class="flex items-center justify-between gap-3">
              <h3 class="text-sm font-medium text-text-primary">{{ t(`pricing.faq${i}_q`) }}</h3>
              <svg class="w-4 h-4 text-text-muted flex-shrink-0 transition-transform" :class="{ 'rotate-180': openFaq === i }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div v-if="openFaq === i" class="mt-3 text-xs text-text-secondary leading-relaxed">{{ t(`pricing.faq${i}_a`) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

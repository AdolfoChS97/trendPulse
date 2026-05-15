<script setup lang="ts">
import { ref } from 'vue'

const openIndex = ref<number | null>(0)

const faqs = [
  {
    q: 'Do I need a business account on each platform?',
    a: 'Yes. To monitor trends, you connect your own business/creator accounts via OAuth. This ensures you use your own API quota and TrendPulse stays free.',
  },
  {
    q: 'Is my data private?',
    a: 'Absolutely. Your connected accounts and monitored keywords are visible only to you. We never share or sell your data.',
  },
  {
    q: 'How often is trend data updated?',
    a: 'Free (Explorer) users get daily updates. Creator users get updates every 6 hours. Business users get real-time updates.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel anytime from Settings. Your data stays available for the remainder of your billing period.',
  },
  {
    q: 'What platforms do you support?',
    a: 'X (Twitter), YouTube, Instagram, TikTok, and Twitch. We are actively working on adding more.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. The Explorer plan is completely free. No credit card required.',
  },
]

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section class="px-6 py-10">
    <h2 class="text-lg font-bold text-text-primary text-center mb-1">
      Frequently asked
    </h2>
    <p class="text-xs text-text-secondary text-center mb-8">
      Quick answers to common questions
    </p>

    <div class="flex flex-col gap-2 max-w-sm mx-auto">
      <div
        v-for="(faq, i) in faqs"
        :key="i"
        class="card cursor-pointer transition-colors"
        :class="openIndex === i ? 'border-brand-400' : ''"
        @click="toggle(i)"
      >
        <div class="flex items-center justify-between gap-3">
          <h3 class="text-sm font-medium text-text-primary">
            {{ faq.q }}
          </h3>
          <svg
            class="w-4 h-4 text-text-muted flex-shrink-0 transition-transform"
            :class="{ 'rotate-180': openIndex === i }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        <div
          v-if="openIndex === i"
          class="mt-3 text-xs text-text-secondary leading-relaxed"
        >
          {{ faq.a }}
        </div>
      </div>
    </div>
  </section>
</template>

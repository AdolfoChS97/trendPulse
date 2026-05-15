<script setup lang="ts">
defineEmits<{
  selectPlan: [tier: string]
}>()

const plans = [
  {
    tier: 'explorer',
    name: 'Explorer',
    price: '$0',
    period: 'forever',
    cta: 'Start Free',
    highlight: false,
    features: ['2 keywords', '2 platforms', '7-day history', 'Daily updates', 'Basic trend graph'],
  },
  {
    tier: 'creator',
    name: 'Creator',
    price: '$9.99',
    period: '/mo',
    cta: 'Upgrade',
    highlight: true,
    features: ['10 keywords', 'All 5 platforms', '30-day history', 'Real-time alerts', 'Sentiment analysis', 'CSV export'],
  },
  {
    tier: 'business',
    name: 'Business',
    price: '$29.99',
    period: '/mo',
    cta: 'Upgrade',
    highlight: false,
    features: ['25 keywords', 'All platforms', '90-day history', 'AI insights', 'PDF reports', 'Team access (3)', 'Push notifications'],
  },
]
</script>

<template>
  <section class="px-6 py-10">
    <h2 class="text-lg font-bold text-text-primary text-center mb-1">
      Simple pricing
    </h2>
    <p class="text-xs text-text-secondary text-center mb-8">
      Start free. Upgrade when you grow.
    </p>

    <div class="flex flex-col gap-4 max-w-sm mx-auto">
      <div
        v-for="plan in plans"
        :key="plan.tier"
        :class="[
          'card flex flex-col gap-3 p-5',
          plan.highlight
            ? 'border-brand-400 shadow-glow-brand'
            : '',
        ]"
      >
        <div class="flex items-baseline justify-between">
          <div>
            <h3 class="text-sm font-semibold text-text-primary">
              {{ plan.name }}
            </h3>
            <div class="flex items-baseline gap-1 mt-1">
              <span class="text-xl font-bold text-text-primary font-mono">{{ plan.price }}</span>
              <span class="text-xs text-text-muted">{{ plan.period }}</span>
            </div>
          </div>

          <button
            :class="[
              'px-4 py-2 rounded-lg text-xs font-semibold transition-all',
              plan.highlight
                ? 'bg-gradient-to-r from-brand-400 to-[#00D2FF] text-white hover:shadow-glow-brand'
                : 'border border-border-default text-text-secondary hover:border-brand-400 hover:text-text-primary',
            ]"
            @click="$emit('selectPlan', plan.tier)"
          >
            {{ plan.cta }}
          </button>
        </div>

        <ul class="space-y-1">
          <li
            v-for="f in plan.features"
            :key="f"
            class="flex items-center gap-2 text-xs text-text-secondary"
          >
            <svg class="w-3.5 h-3.5 text-success flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {{ f }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

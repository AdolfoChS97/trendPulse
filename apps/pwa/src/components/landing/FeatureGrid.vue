<script setup lang="ts">
const features = [
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Trend Detection',
    desc: 'Monitor keywords across 5 platforms in real time. Spot trends before they go mainstream.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Cross-Platform Score',
    desc: 'One unified score (0-100) combining volume, growth rate, and sentiment across all networks.',
  },
  {
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    title: 'Real-time Alerts',
    desc: 'Get notified the moment a trend spikes. Never miss an emerging opportunity again.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Emerging Prediction',
    desc: 'Our algorithm detects acceleration patterns to warn you 24-48h before a trend goes viral.',
  },
  {
    icon: 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    title: 'Offline PWA',
    desc: 'Install on your phone. Works offline. Check your trends anywhere, anytime.',
  },
  {
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: '5 Platforms',
    desc: 'X, YouTube, Instagram, TikTok, and Twitch — all in one dashboard. Connect your own accounts.',
  },
]
</script>

<template>
  <section class="px-6 py-10">
    <h2 class="text-lg font-bold text-text-primary text-center mb-1">
      Everything you need
    </h2>
    <p class="text-xs text-text-secondary text-center mb-8">
      to spot trends before your competition
    </p>

    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="(f, i) in features"
        :key="i"
        class="card flex flex-col items-center text-center p-4 gap-2"
      >
        <svg
          class="w-6 h-6 text-brand-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path :d="f.icon" />
        </svg>

        <h3 class="text-sm font-semibold text-text-primary">
          {{ f.title }}
        </h3>

        <p class="text-[11px] text-text-secondary leading-relaxed">
          {{ f.desc }}
        </p>
      </div>
    </div>
  </section>
</template>

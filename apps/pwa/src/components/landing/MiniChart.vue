<script setup lang="ts">
</script>

<template>
  <svg class="w-full h-12" viewBox="0 0 180 48" fill="none">
    <!-- Grid lines -->
    <line x1="0" y1="36" x2="180" y2="36" stroke="#252D3E" stroke-width="0.5" />
    <line x1="0" y1="24" x2="180" y2="24" stroke="#252D3E" stroke-width="0.5" />
    <line x1="0" y1="12" x2="180" y2="12" stroke="#252D3E" stroke-width="0.3" />

    <!-- Area fill -->
    <path
      d="M0 36 L20 32 L40 28 L60 30 L80 24 L100 18 L120 20 L140 12 L160 10 L180 6 L180 36 Z"
      fill="url(#mini-chart-grad)"
      opacity="0.12"
    />
    <!-- Line -->
    <path
      d="M0 36 L20 32 L40 28 L60 30 L80 24 L100 18 L120 20 L140 12 L160 10 L180 6"
      stroke="#00E396"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Last dot -->
    <circle cx="180" cy="6" r="3" fill="#00E396" />
    <circle cx="180" cy="6" r="6" fill="#00E396" opacity="0.1" />

    <defs>
      <linearGradient id="mini-chart-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#00E396" />
        <stop offset="100%" stop-color="transparent" />
      </linearGradient>
    </defs>
  </svg>
</template>

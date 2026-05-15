<script setup lang="ts">
defineProps<{
  platform: 'x' | 'youtube' | 'instagram' | 'tiktok' | 'twitch'
  score?: number
}>()

const labels: Record<string, string> = {
  x: 'X',
  youtube: 'YT',
  instagram: 'IG',
  tiktok: 'TK',
  twitch: 'TW',
}

const icons: Record<string, string> = {
  x: '𝕏',
  youtube: '▶',
  instagram: '◉',
  tiktok: '♪',
  twitch: '◻',
}
</script>

<template>
  <span
    :class="['pill inline-flex items-center gap-1', `platform-${platform}`]"
    :style="{
      color: `var(--color-platform-${platform})`,
      backgroundColor: `color-mix(in srgb, var(--color-platform-${platform}) 15%, transparent)`,
      border: `1px solid color-mix(in srgb, var(--color-platform-${platform}) 30%, transparent)`,
    }"
  >
    <span class="text-[10px]">{{ icons[platform] }}</span>
    <span>{{ labels[platform] }}</span>
  </span>
</template>

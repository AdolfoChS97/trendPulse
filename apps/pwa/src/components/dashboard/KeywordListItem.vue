<script setup lang="ts">
defineProps<{
  keywordId: string
  term: string
  score: number
  isEmerging: boolean
  lastUpdated: string
}>()

defineEmits<{
  tap: [id: string]
}>()
</script>

<template>
  <button
    @click="$emit('tap', keywordId)"
    class="card w-full text-left cursor-pointer"
  >
    <div class="flex items-start justify-between">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-text-primary truncate">
          {{ term }}
        </p>
        <p class="text-xs text-text-muted mt-1 font-mono">
          Updated {{ lastUpdated }}
        </p>
      </div>

      <div class="flex items-center gap-2 ml-3">
        <span
          class="metric-number text-lg"
          :class="{
            'score-81-100': score > 80,
            'score-61-80': score > 60 && score <= 80,
            'score-41-60': score > 40 && score <= 60,
            'score-21-40': score > 20 && score <= 40,
            'score-0-20': score <= 20,
          }"
        >
          {{ score }}
        </span>

        <span
          v-if="isEmerging"
          class="pill badge-emerging text-[10px]"
        >
          ⚡
        </span>
      </div>
    </div>
  </button>
</template>

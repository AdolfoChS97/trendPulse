<script setup lang="ts">
import { useOffline } from '@/composables/useOffline'

const { isOnline, lastOnlineAt } = useOffline()
</script>

<template>
  <transition name="slide">
    <div
      v-if="!isOnline"
      class="fixed top-0 left-0 right-0 z-50 bg-warning-muted border-b border-warning px-4 py-2 text-center"
    >
      <p class="text-xs text-warning font-medium">
        You are offline
        <span v-if="lastOnlineAt" class="text-text-muted">
          — last synced {{ lastOnlineAt }}
        </span>
      </p>
    </div>
  </transition>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(-100%);
}
</style>

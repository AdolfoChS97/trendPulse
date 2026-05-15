<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import MobileNav from '@/components/layout/MobileNav.vue'
import OfflineBanner from '@/components/layout/OfflineBanner.vue'
import { useOffline } from '@/composables/useOffline'

const { isOnline } = useOffline()
const router = useRouter()

const showNav = ref(true)

watch(() => router.currentRoute.value, (route) => {
  showNav.value = !route.path.includes('/login')
})
</script>

<template>
  <div class="flex flex-col h-full">
    <OfflineBanner v-if="!isOnline" />

    <main class="flex-1 overflow-y-auto px-4 py-6 pb-20">
      <slot />
    </main>

    <MobileNav v-if="showNav" />
  </div>
</template>

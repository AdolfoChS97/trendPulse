<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useOffline } from '@/composables/useOffline'
import AppShell from '@/components/layout/AppShell.vue'

const auth = useAuthStore()
const { isOnline } = useOffline()

onMounted(async () => {
  await auth.initialize()
})
</script>

<template>
  <router-view v-if="!auth.isAuthenticated" />
  <AppShell v-else>
    <router-view />
  </AppShell>
</template>

<script setup lang="ts">
import { useI18n } from '@/plugins/i18n'
import { useThemeStore } from '@/stores/theme'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const { t } = useI18n()
const themeStore = useThemeStore()
const router = useRouter()

const links = [
  { label: computed(() => t('nav.pricing')), path: '/pricing' },
  { label: computed(() => t('nav.login')), path: '/login' },
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-default">
    <div class="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 h-14 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/login" class="flex items-center gap-2 group">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-[#00D2FF] flex items-center justify-center shadow-glow-brand group-hover:scale-105 transition-transform">
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <span class="text-sm font-bold text-text-primary tracking-tight hidden sm:inline">Trend<span class="text-brand-400">Pulse</span></span>
      </router-link>

      <!-- Links -->
      <div class="flex items-center gap-4 md:gap-6">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="text-xs md:text-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
        >
          {{ link.label }}
        </router-link>
      </div>
    </div>
  </nav>

  <!-- Spacer -->
  <div class="h-14" />
</template>

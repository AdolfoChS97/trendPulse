<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { useI18n } from '@/plugins/i18n'
import { ref } from 'vue'

const themeStore = useThemeStore()
const { locale, setLocale, availableLocales } = useI18n()
const open = ref(false)

function toggleTheme() {
  const next = themeStore.current === 'pulse-dark' ? 'light' : 'pulse-dark'
  themeStore.setTheme(next as any)
}

const flags: Record<string, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
}

const labels: Record<string, string> = {
  en: 'EN',
  es: 'ES',
}

function cycleLang() {
  const idx = availableLocales.indexOf(locale.value)
  const next = availableLocales[(idx + 1) % availableLocales.length]
  setLocale(next)
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <!-- Panel (expandido) -->
    <div v-if="open" class="flex flex-col gap-2 bg-bg-elevated border border-border-default rounded-xl p-3 shadow-lg">
      <!-- Theme toggle -->
      <button
        @click="toggleTheme"
        class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-bg-surface transition-colors"
        :title="themeStore.current === 'pulse-dark' ? 'Switch to light' : 'Switch to dark'"
      >
        <svg v-if="themeStore.current === 'pulse-dark'" class="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg v-else class="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        <span class="text-xs text-text-secondary font-medium">
          {{ themeStore.current === 'pulse-dark' ? 'Light' : 'Dark' }}
        </span>
      </button>

      <!-- Language toggle -->
      <button
        @click="cycleLang"
        class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-bg-surface transition-colors"
      >
        <span class="text-base">{{ flags[locale] }}</span>
        <span class="text-xs text-text-secondary font-medium">{{ labels[locale] }}</span>
      </button>
    </div>

    <!-- Toggle button -->
    <button
      @click="open = !open"
      class="w-11 h-11 rounded-full bg-brand-400 text-white flex items-center justify-center shadow-glow-brand hover:bg-brand-500 transition-all"
      :class="{ 'rotate-45': open }"
    >
      <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': open }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    </button>
  </div>
</template>

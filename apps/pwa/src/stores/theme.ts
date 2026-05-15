import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeName = 'pulse-dark'

export const useThemeStore = defineStore('theme', () => {
  const current = ref<ThemeName>(loadTheme())

  function loadTheme(): ThemeName {
    const stored = localStorage.getItem('tp_theme') as ThemeName | null
    if (stored === 'pulse-dark') return stored
    // Respect system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'pulse-dark' // Pulse Dark even on light preference (no light theme yet)
    }
    return 'pulse-dark'
  }

  function setTheme(name: ThemeName) {
    current.value = name
    localStorage.setItem('tp_theme', name)
    applyTheme(name)
  }

  function applyTheme(name: ThemeName) {
    document.documentElement.setAttribute('data-theme', name)
  }

  // Apply on init
  applyTheme(current.value)

  // Watch for system changes
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', () => {
    if (!localStorage.getItem('tp_theme')) {
      applyTheme('pulse-dark')
    }
  })

  return {
    current,
    setTheme,
  }
})

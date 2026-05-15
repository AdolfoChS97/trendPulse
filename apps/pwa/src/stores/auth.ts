import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  email: string
  name: string
  tier: 'explorer' | 'creator' | 'business' | 'agency'
  avatarUrl?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const loading = ref(true)

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isExplorer = computed(() => user.value?.tier === 'explorer')
  const isPaid = computed(() => user.value?.tier !== 'explorer')

  async function initialize() {
    const storedToken = localStorage.getItem('tp_token')
    const storedRefresh = localStorage.getItem('tp_refresh')
    const storedUser = localStorage.getItem('tp_user')

    if (storedToken && storedUser) {
      token.value = storedToken
      refreshToken.value = storedRefresh
      try {
        user.value = JSON.parse(storedUser)
      } catch {
        logout()
      }
    }

    loading.value = false
  }

  async function login(_credential: string) {
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: _credential }),
    })

    if (!response.ok) throw new Error('Login failed')

    const data = await response.json()
    token.value = data.accessToken
    refreshToken.value = data.refreshToken
    user.value = data.user

    localStorage.setItem('tp_token', data.accessToken)
    localStorage.setItem('tp_refresh', data.refreshToken)
    localStorage.setItem('tp_user', JSON.stringify(data.user))
  }

  async function refreshAccessToken() {
    if (!refreshToken.value) return

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshToken.value }),
      })

      if (!response.ok) throw new Error('Token refresh failed')

      const data = await response.json()
      token.value = data.accessToken
      localStorage.setItem('tp_token', data.accessToken)
    } catch {
      logout()
    }
  }

  function logout() {
    user.value = null
    token.value = null
    refreshToken.value = null
    localStorage.removeItem('tp_token')
    localStorage.removeItem('tp_refresh')
    localStorage.removeItem('tp_user')
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isExplorer,
    isPaid,
    initialize,
    login,
    logout,
    refreshAccessToken,
  }
})

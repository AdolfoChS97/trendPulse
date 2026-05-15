import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

export function useAuth() {
  const auth = useAuthStore()

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isExplorer: auth.isExplorer,
    isPaid: auth.isPaid,
    login: auth.login,
    logout: auth.logout,
  }
}

export function useApi() {
  const auth = useAuthStore()
  const ui = useUiStore()

  async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (auth.token) {
      headers['Authorization'] = `Bearer ${auth.token}`
    }

    const response = await fetch(url, { ...options, headers })

    if (response.status === 401) {
      await auth.refreshAccessToken()
      headers['Authorization'] = `Bearer ${auth.token}`
      const retryResponse = await fetch(url, { ...options, headers })

      if (!retryResponse.ok) {
        const error = await retryResponse.json()
        ui.showToast(error.message || 'Request failed', 'error')
        throw new Error(error.message)
      }

      return retryResponse.json()
    }

    if (response.status === 403) {
      const error = await response.json()
      ui.showToast(error.message || 'Upgrade required', 'warning')
      throw new Error(error.message)
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }))
      ui.showToast(error.message, 'error')
      throw new Error(error.message)
    }

    return response.json()
  }

  return { apiFetch }
}

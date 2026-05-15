import { ref, onMounted, onUnmounted } from 'vue'

export function useOffline() {
  const isOnline = ref(navigator.onLine)
  const lastOnlineAt = ref<string | null>(null)

  function handleOnline() {
    isOnline.value = true
    lastOnlineAt.value = null
    syncPendingActions()
  }

  function handleOffline() {
    isOnline.value = false
    lastOnlineAt.value = new Date().toLocaleTimeString()
  }

  async function syncPendingActions() {
    // Enqueue keywords created offline
    const pending = await getOfflineQueue()

    for (const action of pending) {
      try {
        await fetch(action.url, {
          method: action.method,
          headers: { 'Content-Type': 'application/json' },
          body: action.body,
        })
      } catch {
        // Will retry on next online event
        return
      }
    }

    await clearOfflineQueue()
  }

  async function getOfflineQueue(): Promise<Array<{ url: string; method: string; body?: string }>> {
    try {
      const queue = localStorage.getItem('tp_offline_queue')
      return queue ? JSON.parse(queue) : []
    } catch {
      return []
    }
  }

  async function clearOfflineQueue() {
    localStorage.removeItem('tp_offline_queue')
  }

  onMounted(() => {
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
  })

  onUnmounted(() => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  })

  return { isOnline, lastOnlineAt }
}

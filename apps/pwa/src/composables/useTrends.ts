import { useTrendsStore } from '@/stores/trends'
import { useApi } from '@/composables/useAuth'

export function useTrends() {
  const store = useTrendsStore()
  const { apiFetch } = useApi()

  async function loadKeywords() {
    await store.fetchKeywords()
  }

  async function getSnapshots(keywordId: string) {
    return store.fetchSnapshots(keywordId)
  }

  async function createKeyword(term: string) {
    try {
      await apiFetch('/api/keywords', {
        method: 'POST',
        body: JSON.stringify({ term }),
      })
      await store.fetchKeywords()
    } catch (err) {
      throw err
    }
  }

  async function removeKeyword(id: string) {
    await store.deleteKeyword(id)
  }

  return {
    keywords: store.keywords,
    loading: store.loading,
    error: store.error,
    emergingKeywords: store.emergingKeywords,
    getScoreClass: store.getScoreClass,
    getScoreLabel: store.getScoreLabel,
    loadKeywords,
    getSnapshots,
    createKeyword,
    removeKeyword,
  }
}

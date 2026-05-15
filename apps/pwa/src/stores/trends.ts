import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Keyword {
  id: string
  term: string
  active: boolean
  platforms: PlatformScore[]
  trendScore: number
  isEmerging: boolean
  lastUpdated: string
}

export interface PlatformScore {
  platform: 'x' | 'youtube' | 'instagram' | 'tiktok' | 'twitch'
  score: number
  volume: number
  growthRate: number
}

export interface TrendSnapshot {
  date: string
  score: number
  volume: number
  platform: string
}

export const useTrendsStore = defineStore('trends', () => {
  const keywords = ref<Keyword[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const emergingKeywords = computed(() =>
    keywords.value.filter((k) => k.isEmerging)
  )

  function getScoreClass(score: number): string {
    if (score <= 20) return 'score-0-20'
    if (score <= 40) return 'score-21-40'
    if (score <= 60) return 'score-41-60'
    if (score <= 80) return 'score-61-80'
    return 'score-81-100'
  }

  function getScoreLabel(score: number): string {
    if (score <= 20) return 'Low Interest'
    if (score <= 40) return 'Moderate'
    if (score <= 60) return 'Growing'
    if (score <= 80) return 'Strong'
    return 'Explosive'
  }

  async function fetchKeywords() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/keywords', {
        headers: { Authorization: `Bearer ${localStorage.getItem('tp_token')}` },
      })

      if (!response.ok) throw new Error('Failed to fetch keywords')

      keywords.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  async function fetchSnapshots(keywordId: string): Promise<TrendSnapshot[]> {
    try {
      const response = await fetch(`/api/trends/${keywordId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('tp_token')}` },
      })

      if (!response.ok) throw new Error('Failed to fetch trend data')

      return await response.json()
    } catch {
      return []
    }
  }

  async function addKeyword(term: string) {
    const response = await fetch('/api/keywords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tp_token')}`,
      },
      body: JSON.stringify({ term }),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Failed to add keyword')
    }

    await fetchKeywords()
  }

  async function deleteKeyword(id: string) {
    await fetch(`/api/keywords/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('tp_token')}` },
    })

    keywords.value = keywords.value.filter((k) => k.id !== id)
  }

  return {
    keywords,
    loading,
    error,
    emergingKeywords,
    getScoreClass,
    getScoreLabel,
    fetchKeywords,
    fetchSnapshots,
    addKeyword,
    deleteKeyword,
  }
})

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useTrends } from '@/composables/useTrends'
import { useUiStore } from '@/stores/ui'
import { useI18n } from '@/plugins/i18n'
import BaseButton from '@/components/ui/BaseButton.vue'
import KeywordListItem from '@/components/dashboard/KeywordListItem.vue'

const router = useRouter()
const { t } = useI18n()
const { isExplorer } = useAuth()
const { keywords, loading, error, loadKeywords, createKeyword } = useTrends()
const ui = useUiStore()

const isAdding = ref(false)
const newTerm = ref('')

loadKeywords()

async function handleAdd() {
  if (!newTerm.value.trim()) return
  try {
    await createKeyword(newTerm.value.trim())
    newTerm.value = ''
    isAdding.value = false
    ui.showToast(t('keyword.added'), 'success')
  } catch (err) {
    ui.showToast(err instanceof Error ? err.message : t('common.request_failed'), 'error')
  }
}

function goToDetail(id: string) {
  router.push({ name: 'keyword-detail', params: { id } })
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-lg font-bold text-text-primary">{{ t('dashboard.title') }}</h1>
        <p class="text-xs text-text-secondary mt-0.5">{{ keywords.length }} {{ t('dashboard.monitored') }}</p>
      </div>
      <div v-if="isExplorer" class="flex items-center gap-3">
        <span class="pill text-[10px] text-text-muted border border-border px-2">{{ t('dashboard.free') }}</span>
      </div>
    </div>

    <div v-if="loading && keywords.length === 0" class="flex flex-col gap-3">
      <div v-for="i in 3" :key="i" class="card animate-pulse h-28" />
    </div>

    <div v-else-if="error" class="card border-error text-error p-4">
      <p class="text-sm font-medium">{{ error }}</p>
      <BaseButton variant="ghost" @click="loadKeywords" class="mt-2">{{ t('dashboard.retry') }}</BaseButton>
    </div>

    <div v-else-if="keywords.length === 0" class="card text-center py-12">
      <svg class="w-12 h-12 mx-auto mb-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
      <h2 class="text-text-primary font-semibold mb-1">{{ t('dashboard.empty_title') }}</h2>
      <p class="text-text-secondary text-sm mb-4">{{ t('dashboard.empty_desc') }}</p>
      <BaseButton @click="isAdding = true">{{ t('dashboard.add_btn') }}</BaseButton>
    </div>

    <div v-else class="flex flex-col gap-3">
      <KeywordListItem v-for="kw in keywords" :key="kw.id" :keyword-id="kw.id" :term="kw.term" :score="kw.trendScore" :is-emerging="kw.isEmerging" :last-updated="kw.lastUpdated" @tap="goToDetail" />
    </div>

    <BaseButton v-if="keywords.length > 0" variant="ghost" full @click="isAdding = true">+ {{ t('dashboard.add_btn') }}</BaseButton>

    <div v-if="isAdding" class="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-bg-overlay" @click.self="isAdding = false">
      <div class="bg-bg-elevated rounded-t-xl sm:rounded-xl p-6 w-full max-w-sm">
        <h3 class="text-text-primary font-semibold mb-4">{{ t('keyword.add_title') }}</h3>
        <input v-model="newTerm" type="text" :placeholder="t('keyword.add_placeholder')" class="w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-brand-400 focus:outline-none transition-colors" @keyup.enter="handleAdd" />
        <p class="text-xs text-text-muted mt-2">{{ t('keyword.add_subtitle') }}</p>
        <div class="flex gap-3 mt-4">
          <BaseButton variant="secondary" full @click="isAdding = false">{{ t('keyword.add_cancel') }}</BaseButton>
          <BaseButton full :disabled="!newTerm.trim()" @click="handleAdd">{{ t('keyword.add_track') }}</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

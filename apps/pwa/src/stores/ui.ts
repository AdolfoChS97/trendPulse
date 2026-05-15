import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isAddingKeyword = ref(false)
  const newKeywordTerm = ref('')
  const toastMessage = ref<string | null>(null)
  const toastType = ref<'success' | 'error' | 'warning' | 'info'>('info')

  function showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    toastMessage.value = message
    toastType.value = type
    setTimeout(() => {
      toastMessage.value = null
    }, 4000)
  }

  function openAddKeyword() {
    isAddingKeyword.value = true
    newKeywordTerm.value = ''
  }

  function closeAddKeyword() {
    isAddingKeyword.value = false
    newKeywordTerm.value = ''
  }

  return {
    isAddingKeyword,
    newKeywordTerm,
    toastMessage,
    toastType,
    showToast,
    openAddKeyword,
    closeAddKeyword,
  }
})

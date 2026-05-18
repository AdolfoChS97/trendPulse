<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useOrganizationStore } from '@/stores/organization'
import { useI18n } from '@/plugins/i18n'

const router = useRouter()
const auth = useAuthStore()
const orgStore = useOrganizationStore()
const { t } = useI18n()

const showSwitcher = computed(() =>
  orgStore.hasMultipleOrgs || auth.user?.platform_role !== 'user'
)

const isSuperAdmin = computed(() =>
  auth.user?.platform_role === 'super_admin' || auth.user?.platform_role === 'admin'
)

function switchOrg(id: string) {
  orgStore.setActiveOrg(id)
  router.push({ name: 'dashboard' })
}

function goAdmin() {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div v-if="showSwitcher" class="relative">
    <button
      class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-surface border border-border-default transition-all"
      @click="(e) => { const menu = (e.currentTarget as HTMLElement).nextElementSibling; menu?.classList.toggle('hidden') }"
    >
      <div class="w-4 h-4 rounded bg-brand-400/20 flex items-center justify-center">
        <span class="text-[8px] font-bold text-brand-400">{{ orgStore.activeOrg?.name?.charAt(0) || '?' }}</span>
      </div>
      <span class="max-w-[80px] truncate">{{ orgStore.activeOrg?.name || 'Select org' }}</span>
      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>

    <!-- Dropdown -->
    <div class="hidden absolute top-full right-0 mt-2 w-56 bg-bg-elevated border border-border-default rounded-xl shadow-lg z-50">
      <div class="p-2">
        <div class="px-3 py-1.5 text-[10px] text-text-muted uppercase tracking-wider font-semibold">
          {{ t('nav.dashboard') }}
        </div>

        <button
          v-for="org in orgStore.orgs"
          :key="org.id"
          @click="switchOrg(org.id)"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-bg-surface transition-colors text-left"
          :class="{ 'bg-brand-100/50': org.id === orgStore.activeOrgId }"
        >
          <div class="w-5 h-5 rounded bg-brand-400/20 flex items-center justify-center flex-shrink-0">
            <span class="text-[9px] font-bold text-brand-400">{{ org.name.charAt(0) }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-medium truncate">{{ org.name }}</div>
            <div class="text-[10px] text-text-muted">{{ org.tier }}</div>
          </div>
          <span v-if="org.id === orgStore.activeOrgId" class="text-brand-400">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
        </button>
      </div>

      <!-- Admin mode -->
      <div v-if="isSuperAdmin" class="border-t border-border-default p-2">
        <button
          @click="goAdmin"
          class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-warning hover:bg-warning-muted transition-colors"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          Admin mode
        </button>
      </div>
    </div>
  </div>
</template>

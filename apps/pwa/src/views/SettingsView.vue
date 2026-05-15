<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useI18n } from '@/plugins/i18n'
import BaseButton from '@/components/ui/BaseButton.vue'

const { user, isExplorer, logout } = useAuth()
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-lg font-bold text-text-primary">{{ t('settings.title') }}</h1>

    <div class="card flex items-center gap-4">
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-[#00D2FF] flex items-center justify-center text-white font-bold text-lg">
        {{ user?.name?.charAt(0)?.toUpperCase() || '?' }}
      </div>
      <div class="flex-1">
        <p class="text-sm font-semibold text-text-primary">{{ user?.name || 'User' }}</p>
        <p class="text-xs text-text-secondary">{{ user?.email || '' }}</p>
      </div>
    </div>

    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm font-semibold text-text-primary">{{ t('settings.plan') }}</h2>
        <span :class="['pill', isExplorer ? 'text-text-muted border border-border' : 'bg-brand-100 text-brand-400 border border-brand-400']">
          {{ t(`settings.${user?.tier || 'explorer'}`) }}
        </span>
      </div>

      <div v-if="isExplorer" class="space-y-2">
        <p class="text-xs text-text-secondary">{{ t('settings.upgrade_desc') }}</p>
        <ul class="text-xs text-text-secondary space-y-1 ml-4">
          <li>{{ t('settings.upgrade_feat1') }}</li>
          <li>{{ t('settings.upgrade_feat2') }}</li>
          <li>{{ t('settings.upgrade_feat3') }}</li>
          <li>{{ t('settings.upgrade_feat4') }}</li>
          <li>{{ t('settings.upgrade_feat5') }}</li>
        </ul>
        <BaseButton class="mt-3" full>{{ t('settings.upgrade_cta') }}</BaseButton>
      </div>

      <div v-else>
        <p class="text-xs text-text-secondary">{{ t('settings.managed_billing') }}</p>
      </div>
    </div>

    <div class="card">
      <h2 class="text-sm font-semibold text-text-primary mb-3">{{ t('settings.profile') }}</h2>
      <button class="w-full text-left py-2 text-sm text-text-secondary hover:text-text-primary transition-colors border-b border-border">{{ t('settings.connected_platforms') }}</button>
      <button class="w-full text-left py-2 text-sm text-text-secondary hover:text-text-primary transition-colors border-b border-border">{{ t('settings.notifications') }}</button>
      <button class="w-full text-left py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">{{ t('settings.privacy') }}</button>
    </div>

    <BaseButton variant="ghost" @click="logout" class="text-text-muted hover:text-error">{{ t('settings.logout') }}</BaseButton>
  </div>
</template>

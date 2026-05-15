<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import BaseButton from '@/components/ui/BaseButton.vue'

const { user, isExplorer, logout } = useAuth()
</script>

<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-lg font-bold text-text-primary">Settings</h1>

    <!-- Profile -->
    <div class="card flex items-center gap-4">
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-[#00D2FF] flex items-center justify-center text-white font-bold text-lg">
        {{ user?.name?.charAt(0)?.toUpperCase() || '?' }}
      </div>
      <div class="flex-1">
        <p class="text-sm font-semibold text-text-primary">{{ user?.name || 'User' }}</p>
        <p class="text-xs text-text-secondary">{{ user?.email || '' }}</p>
      </div>
    </div>

    <!-- Plan -->
    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm font-semibold text-text-primary">Plan</h2>
        <span
          :class="[
            'pill',
            isExplorer
              ? 'text-text-muted border border-border'
              : 'bg-brand-100 text-brand-400 border border-brand-400'
          ]"
        >
          {{ user?.tier === 'explorer' ? 'Explorer' : user?.tier || 'Free' }}
        </span>
      </div>

      <div v-if="isExplorer" class="space-y-2">
        <p class="text-xs text-text-secondary">
          You're on the free plan. Upgrade for:
        </p>
        <ul class="text-xs text-text-secondary space-y-1 ml-4">
          <li>· 10 keywords (up from 2)</li>
          <li>· All 5 platforms</li>
          <li>· 30-day history</li>
          <li>· AI-powered insights</li>
          <li>· Data export (CSV)</li>
        </ul>
        <BaseButton class="mt-3" full>
          Upgrade to Creator — $9.99/mo
        </BaseButton>
      </div>

      <div v-else>
        <p class="text-xs text-text-secondary">
          You're on Creator plan. Manage billing in the web dashboard.
        </p>
      </div>
    </div>

    <!-- Account -->
    <div class="card">
      <h2 class="text-sm font-semibold text-text-primary mb-3">Account</h2>

      <button class="w-full text-left py-2 text-sm text-text-secondary hover:text-text-primary transition-colors border-b border-border">
        Connected Platforms
      </button>
      <button class="w-full text-left py-2 text-sm text-text-secondary hover:text-text-primary transition-colors border-b border-border">
        Notification Settings
      </button>
      <button class="w-full text-left py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
        Privacy Policy
      </button>
    </div>

    <!-- Logout -->
    <BaseButton
      variant="ghost"
      @click="logout"
      class="text-text-muted hover:text-error"
    >
      Log out
    </BaseButton>
  </div>
</template>

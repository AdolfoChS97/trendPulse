<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useUiStore } from '@/stores/ui'
import BaseButton from '@/components/ui/BaseButton.vue'

const { login } = useAuth()
const ui = useUiStore()
const loading = ref(false)

async function handleGoogleLogin() {
  loading.value = true

  try {
    // In production, this uses the Google Identity Services SDK
    // For now, we handle the credential response
    const credential = await new Promise<string>((resolve, reject) => {
      // Simulate Google One Tap callback
      const timeout = setTimeout(() => {
        reject(new Error('Google sign-in timed out'))
      }, 30000)

      // In production, Google's JS library calls this
      ;(window as any).handleCredentialResponse = (response: { credential: string }) => {
        clearTimeout(timeout)
        resolve(response.credential)
      }
    })

    await login(credential)
    ui.showToast('Welcome to TrendPulse!', 'success')
  } catch (err) {
    ui.showToast('Login failed. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-full px-6 py-12">
    <!-- Logo -->
    <div class="mb-8">
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-[#00D2FF] flex items-center justify-center shadow-glow-brand mb-4 mx-auto">
        <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>

      <h1 class="text-2xl font-bold text-text-primary text-center">
        TrendPulse
      </h1>
      <p class="text-sm text-text-secondary text-center mt-2 max-w-xs mx-auto">
        Track social media trends across X, YouTube, Instagram, TikTok and Twitch
      </p>
    </div>

    <!-- Features -->
    <div class="grid grid-cols-2 gap-3 mb-8 w-full max-w-xs">
      <div class="glass-spot card text-center py-3">
        <p class="text-lg mb-1">🔍</p>
        <p class="text-[10px] text-text-secondary">Trend<br/>Detection</p>
      </div>
      <div class="card text-center py-3">
        <p class="text-lg mb-1">📊</p>
        <p class="text-[10px] text-text-secondary">Real-time<br/>Analytics</p>
      </div>
      <div class="card text-center py-3">
        <p class="text-lg mb-1">🧠</p>
        <p class="text-[10px] text-text-secondary">AI<br/>Insights</p>
      </div>
      <div class="card text-center py-3">
        <p class="text-lg mb-1">🖐️</p>
        <p class="text-[10px] text-text-secondary">5<br/>Platforms</p>
      </div>
    </div>

    <!-- Google Sign In -->
    <div class="w-full max-w-xs">
      <button
        @click="handleGoogleLogin"
        :disabled="loading"
        class="w-full flex items-center justify-center gap-3 bg-white text-gray-900 rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span v-if="!loading">Continue with Google</span>
        <span v-else>Signing in...</span>
      </button>

      <p class="text-[10px] text-text-muted text-center mt-4 max-w-[280px] mx-auto">
        By continuing, you agree to our Terms of Service and Privacy Policy.
        No credit card required.
      </p>
    </div>
  </div>
</template>

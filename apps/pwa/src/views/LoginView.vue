<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '@/components/landing/NavBar.vue'
import LandingHero from '@/components/landing/LandingHero.vue'
import HowItWorks from '@/components/landing/HowItWorks.vue'
import SocialProof from '@/components/landing/SocialProof.vue'
import FinalCTA from '@/components/landing/FinalCTA.vue'
import FloatingControls from '@/components/landing/FloatingControls.vue'
import { useAuth } from '@/composables/useAuth'
import { useUiStore } from '@/stores/ui'

const { login } = useAuth()
const ui = useUiStore()
const loading = ref(false)

async function handleGoogleLogin() {
  loading.value = true
  try {
    const credential = await new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Google sign-in timed out')), 30000)
      ;(window as any).handleCredentialResponse = (response: { credential: string }) => {
        clearTimeout(timeout)
        resolve(response.credential)
      }
    })
    await login(credential)
    ui.showToast('Welcome to TrendPulse!', 'success')
  } catch {
    ui.showToast('Login failed. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-full">
    <NavBar />
    <LandingHero @login="handleGoogleLogin" />

    <!-- Section divider -->
    <div class="px-6 md:px-12 lg:px-24"><div class="max-w-6xl mx-auto h-px bg-border-default" /></div>

    <HowItWorks />

    <div class="px-6 md:px-12 lg:px-24"><div class="max-w-6xl mx-auto h-px bg-border-default" /></div>

    <SocialProof />

    <div class="px-6 md:px-12 lg:px-24"><div class="max-w-6xl mx-auto h-px bg-border-default" /></div>

    <FinalCTA @login="handleGoogleLogin" />

    <FloatingControls />
  </div>
</template>

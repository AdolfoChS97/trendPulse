<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '@/plugins/i18n'

const router = useRouter()
const { t } = useI18n()

const step = ref(1)
const keyword = ref('')
const platforms = ref<string[]>([])
const inviteEmail = ref('')
const tier = ref<'explorer' | 'creator' | 'business'>( 'explorer')

const showTeamStep = computed(() =>
  tier.value === 'business' || tier.value === 'agency'
)

const suggestions = [
  'AI tools',
  'Faceless channels',
  'Vlog comeback',
  'UGC portfolios',
  'Sustainable fashion',
  'Niche newsletters',
]

const platformList = [
  { id: 'x', name: 'X', color: '#1DA1F2' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000' },
  { id: 'instagram', name: 'Instagram', color: '#E1306C' },
  { id: 'tiktok', name: 'TikTok', color: '#FF0050' },
  { id: 'twitch', name: 'Twitch', color: '#9146FF' },
]

function togglePlatform(id: string) {
  const idx = platforms.value.indexOf(id)
  if (idx > -1) platforms.value.splice(idx, 1)
  else platforms.value.push(id)
}

function selectSuggestion(s: string) {
  keyword.value = s
}

function goNext() {
  if (step.value === 1 && !keyword.value.trim()) return
  step.value++
}

function goBack() {
  if (step.value > 1) step.value--
}

function finish() {
  // In production: POST to API to save keyword + platforms + onboarding_completed
  router.push({ name: 'dashboard' })
}

function skip() {
  goNext()
}
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center px-6 py-10">
    <!-- Progress bar -->
    <div class="w-full max-w-sm mb-8">
      <div class="flex items-center justify-between mb-2">
        <span
          v-for="s in (showTeamStep ? 3 : 2)"
          :key="s"
          class="text-xs font-medium transition-colors"
          :class="s <= step ? 'text-brand-400' : 'text-text-muted'"
        >
          Step {{ s }}
        </span>
      </div>
      <div class="w-full h-1 bg-bg-elevated rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-brand-400 to-[#00D2FF] rounded-full transition-all duration-500"
          :style="{ width: `${(step / (showTeamStep ? 3 : 2)) * 100}%` }"
        />
      </div>
    </div>

    <!-- Step 1: Keyword -->
    <div v-if="step === 1" class="w-full max-w-sm text-center">
      <div class="text-4xl mb-4">👋</div>
      <h1 class="text-xl font-bold text-text-primary mb-2">
        Welcome! What niche do you want to track?
      </h1>
      <p class="text-sm text-text-secondary mb-6">
        Type any product, topic, or trend. You can add more later.
      </p>

      <input
        v-model="keyword"
        type="text"
        :placeholder="t('keyword.add_placeholder')"
        class="w-full bg-bg-elevated border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-brand-400 focus:outline-none transition-colors"
        @keyup.enter="goNext"
      />

      <div class="flex flex-wrap gap-2 justify-center mt-4">
        <button
          v-for="s in suggestions"
          :key="s"
          @click="selectSuggestion(s)"
          class="px-3 py-1.5 rounded-full text-[11px] border border-border-default text-text-secondary hover:border-brand-400 hover:text-text-primary transition-colors cursor-pointer"
        >
          {{ s }}
        </button>
      </div>

      <button
        :disabled="!keyword.trim()"
        class="mt-8 w-full py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-brand-400 to-[#00D2FF] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-glow-brand transition-all"
        @click="goNext"
      >
        Continue
      </button>
    </div>

    <!-- Step 2: Connect platforms -->
    <div v-if="step === 2" class="w-full max-w-sm">
      <div class="text-4xl mb-4 text-center">🔗</div>
      <h1 class="text-xl font-bold text-text-primary text-center mb-2">
        Connect where you create
      </h1>
      <p class="text-sm text-text-secondary text-center mb-6">
        Link your social accounts in one click. We'll use public data until then.
      </p>

      <div class="flex flex-col gap-3">
        <button
          v-for="p in platformList"
          :key="p.id"
          @click="togglePlatform(p.id)"
          class="flex items-center gap-3 w-full p-4 rounded-lg border transition-all cursor-pointer"
          :class="platforms.includes(p.id)
            ? 'border-brand-400 bg-brand-100'
            : 'border-border-default hover:border-border-hover'"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            :style="{ backgroundColor: `${p.color}18` }"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" :style="{ color: p.color }">
              <path v-if="p.id === 'x'" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-text-primary flex-1 text-left">{{ p.name }}</span>
          <span class="text-[11px]" :class="platforms.includes(p.id) ? 'text-brand-400' : 'text-text-muted'">
            {{ platforms.includes(p.id) ? 'Selected' : 'Connect' }}
          </span>
        </button>
      </div>

      <div class="flex gap-3 mt-8">
        <button
          class="flex-1 py-3 rounded-lg text-sm font-medium border border-border-default text-text-secondary hover:border-brand-400 hover:text-text-primary transition-all"
          @click="skip"
        >
          Skip for now
        </button>
        <button
          class="flex-1 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-brand-400 to-[#00D2FF] text-white hover:shadow-glow-brand transition-all"
          @click="goNext"
        >
          {{ showTeamStep ? 'Continue' : 'Go to Dashboard' }}
        </button>
      </div>
    </div>

    <!-- Step 3: Invite team -->
    <div v-if="step === 3 && showTeamStep" class="w-full max-w-sm">
      <div class="text-4xl mb-4 text-center">👥</div>
      <h1 class="text-xl font-bold text-text-primary text-center mb-2">
        Build your team
      </h1>
      <p class="text-sm text-text-secondary text-center mb-6">
        Invite collaborators to your organization.
      </p>

      <div class="flex gap-3">
        <input
          v-model="inviteEmail"
          type="email"
          placeholder="ana@company.com"
          class="flex-1 bg-bg-elevated border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-brand-400 focus:outline-none transition-colors"
        />
        <button
          :disabled="!inviteEmail.includes('@')"
          class="px-4 py-3 rounded-lg text-sm font-medium border border-brand-400 text-brand-400 hover:bg-brand-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Invite
        </button>
      </div>

      <div class="flex gap-3 mt-8">
        <button
          class="flex-1 py-3 rounded-lg text-sm font-medium border border-border-default text-text-secondary hover:border-brand-400 hover:text-text-primary transition-all"
          @click="finish"
        >
          Skip for now
        </button>
        <button
          class="flex-1 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-brand-400 to-[#00D2FF] text-white hover:shadow-glow-brand transition-all"
          @click="finish"
        >
          Go to Dashboard
        </button>
      </div>
    </div>

    <!-- Step 2 skip → dashboard directly if no team step -->
    <div v-if="step === 2 && !showTeamStep" />
  </div>
</template>

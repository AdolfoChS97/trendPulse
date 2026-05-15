<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  full?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm transition-all duration-150 cursor-pointer',
      {
        'btn-primary': variant === 'primary' || !variant,
        'btn-secondary': variant === 'secondary',
        'bg-transparent text-brand-400 hover:bg-brand-100 rounded-md px-4 py-2': variant === 'ghost',
        'w-full': full,
        'opacity-50 cursor-not-allowed': disabled,
      },
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

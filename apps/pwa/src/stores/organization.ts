import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Org {
  id: string
  name: string
  slug: string
  type: 'individual' | 'company' | 'agency'
  tier: 'explorer' | 'creator' | 'business' | 'agency'
  onboarding_completed: boolean
  onboarding_step: number
  role: string
  role_id: string
}

export const useOrganizationStore = defineStore('organization', () => {
  const orgs = ref<Org[]>([])
  const activeOrgId = ref<string | null>(localStorage.getItem('tp_active_org'))

  const activeOrg = computed(() =>
    orgs.value.find((o) => o.id === activeOrgId.value) ?? null
  )

  const hasMultipleOrgs = computed(() => orgs.value.length > 1)

  function setOrgs(list: Org[]) {
    orgs.value = list
    if (!activeOrgId.value && list.length > 0) {
      setActiveOrg(list[0].id)
    }
  }

  function setActiveOrg(id: string) {
    activeOrgId.value = id
    localStorage.setItem('tp_active_org', id)
  }

  function addOrg(org: Org) {
    orgs.value.push(org)
  }

  return {
    orgs,
    activeOrgId,
    activeOrg,
    hasMultipleOrgs,
    setOrgs,
    setActiveOrg,
    addOrg,
  }
})

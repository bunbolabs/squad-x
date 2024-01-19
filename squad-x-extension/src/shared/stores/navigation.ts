import { create } from 'zustand'

import { Tab } from '@/types/navigation'

interface NavigationStore {
  tab: Tab
  setTab: (tab: Tab) => void

  previousTab: Tab

  back: () => void

  isShowNavigationBar: boolean
  setIsShowNavigationBar: (isShowNavigationBar: boolean) => void
}

export const useNavigationStore = create<NavigationStore>()(set => ({
  tab: 'home',
  setTab: (tab: Tab) => set(state => ({ tab, previousTab: state.tab })),

  previousTab: 'home',
  back: () => set(state => ({ tab: state.previousTab })),

  isShowNavigationBar: true,
  setIsShowNavigationBar: (isShowNavigationBar: boolean) => set({ isShowNavigationBar }),
}))

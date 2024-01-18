import { useNavigationStore } from '@/stores/navigation'

export default function useNavigation() {
  const navigation = useNavigationStore()

  return {
    ...navigation,
  }
}

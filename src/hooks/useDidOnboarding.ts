import { useLocalStorage } from 'usehooks-ts';

export function useDidOnboarding() {
  return useLocalStorage<Record<string, boolean>>('didOnboarding', {});
}

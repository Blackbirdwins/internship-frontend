import { createContext, useContext } from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';

const OnboardingContext = createContext(null);

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be inside OnboardingProvider');
  return ctx;
};

export function OnboardingProvider({ children }) {
  const [seen, setSeen, meta] = useAsyncStorage('onboarding_seen', false);

  return (
    <OnboardingContext.Provider
      value={{
        seen,
        markSeen: () => setSeen(true),
        reset: () => setSeen(false),
        loaded: meta.loaded,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
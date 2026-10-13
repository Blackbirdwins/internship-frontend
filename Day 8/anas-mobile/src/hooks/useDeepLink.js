import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { log } from '../utils/logger';

export default function useDeepLink(onDeepLink) {
  useEffect(() => {
    // App already open — new link received
    const sub = Linking.addEventListener('url', ({ url }) => {
      log('Deep link received:', url);
      onDeepLink?.(url);
    });

    // App cold start — check initial URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        log('Initial deep link:', url);
        onDeepLink?.(url);
      }
    });

    return () => sub.remove();
  }, [onDeepLink]);
}
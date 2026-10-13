import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

export default function useAppState(onChange) {
  const [state, setState] = useState(AppState.currentState);
  const lastActive = useRef(Date.now());
  const [backgroundedFor, setBackgroundedFor] = useState(0);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      const prev = state;
      setState(next);

      if (prev !== 'active' && next === 'active') {
        const bg = Date.now() - lastActive.current;
        setBackgroundedFor(bg);
      } else if (next === 'background' || next === 'inactive') {
        lastActive.current = Date.now();
      }

      onChange?.(next, prev);
    });

    return () => sub.remove();
  }, [state, onChange]);

  return { state, backgroundedFor };
}   
import { useEffect, useRef, useState } from 'react';
import { Text, Animated } from 'react-native';

export default function AnimatedNumber({ value, duration = 800, style }) {
  const [display, setDisplay] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    const listener = anim.addListener(({ value: v }) => {
      setDisplay(Math.floor(v));
    });
    Animated.timing(anim, {
      toValue: value,
      duration,
      useNativeDriver: false,
    }).start();
    return () => anim.removeListener(listener);
  }, [value]);

  return <Text style={style}>{display}</Text>;
}
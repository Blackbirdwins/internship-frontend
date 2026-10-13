import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

export default function useKeyboard() {
  const [shown, setShown] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvt, (e) => {
      setShown(true);
      setHeight(e.endCoordinates?.height || 0);
    });
    const hideSub = Keyboard.addListener(hideEvt, () => {
      setShown(false);
      setHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const dismiss = () => Keyboard.dismiss();

  return { shown, height, dismiss };
}
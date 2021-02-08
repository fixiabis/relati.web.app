import { useCallback, useState } from 'react';

export const useSwitch = (isDefaultOn: boolean) => {
  const [isOn, setIsOn] = useState(isDefaultOn);
  const switchOn = useCallback(() => setIsOn(true), [setIsOn]);
  const switchOff = useCallback(() => setIsOn(false), [setIsOn]);
  return [isOn, switchOn, switchOff] as [boolean, () => void, () => void];
};

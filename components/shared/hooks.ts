import { useSwitch } from '../core';

export const useDialogState = () => {
  const [isVisible, open, close] = useSwitch(false);
  return { isVisible, open, close };
};

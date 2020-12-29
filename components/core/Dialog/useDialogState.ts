import { useCallback, useState } from 'react';

export const useDialogState = (
  isDefaultVisible: boolean
): [boolean, () => void, () => void] => {
  const [isVisible, setIsVisible] = useState(isDefaultVisible);
  const openDialog = useCallback(() => setIsVisible(true), [setIsVisible]);
  const closeDialog = useCallback(() => setIsVisible(false), [setIsVisible]);
  return [isVisible, openDialog, closeDialog];
};

export default useDialogState;

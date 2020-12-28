import { useEffect } from 'react';
import { useRouter } from 'next/router';
import GameLayouts from './GameLayouts';

const useRedirectOnNotFound = (mode: string) => {
  const router = useRouter();

  useEffect(() => {
    if (!(mode in GameLayouts)) {
      router.replace('/');
    }
  }, [mode]);
};

export default useRedirectOnNotFound;

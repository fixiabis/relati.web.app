import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChooseModeUsage } from './index';
import ChooseModeLayouts from './ChooseModeLayouts';

const routes: Partial<Record<ChooseModeUsage, string>> = {
  'x5-1p-with-o-game': '/game?on=x5&as=1p&with=o',
  'x5-1p-with-x-game': '/game?on=x5&as=1p&with=x',
  'x5-1p-puzzle-game': '/choose-stage?for=puzzle&on=x5',
  'x5-2p-game': '/game?on=x5&as=2p',
  'x5-2p-online-game': '/game?on=x5&as=2p-online',

  'x7-1p-with-o-game': '/game?on=x7&as=1p&with=o',
  'x7-1p-with-x-game': '/game?on=x7&as=1p&with=x',
  'x7-1p-puzzle-game': '/choose-stage?for=puzzle&on=x7',
  'x7-2p-game': '/game?on=x7&as=2p',
  'x7-2p-online-game': '/game?on=x7&as=2p-online',

  'x9-1p-with-o-game': '/game?on=x9&as=1p&with=o',
  'x9-1p-with-x-game': '/game?on=x9&as=1p&with=x',
  'x9-1p-puzzle-game': '/choose-stage?for=puzzle&on=x9',
  'x9-2p-game': '/game?on=x9&as=2p',
  'x9-2p-online-game': '/game?on=x9&as=2p-online',

  'x5-tutorial': '/tutorial?on=x5',
  'x7-tutorial': '/tutorial?on=x7',
  'x9-tutorial': '/tutorial?on=x9',
};

const useRedirectOnChoosedOrNotFound = (usage: string) => {
  const router = useRouter();

  useEffect(() => {
    if (usage in routes) {
      const route = routes[usage];
      router.replace(route);
    } else if (!(usage in ChooseModeLayouts)) {
      router.replace('/');
    }
  }, [usage]);
};

export default useRedirectOnChoosedOrNotFound;

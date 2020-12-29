import { ChooseModeLayoutComponent, ChooseModeUsage } from './index';

import {
  ChooseBoardSize,
  ChooseModeForOnePlayer,
  ChoosePlayerForGame,
} from './layouts';

const ChooseModeLayouts: Partial<
  Record<ChooseModeUsage, ChooseModeLayoutComponent>
> = {
  game: ChoosePlayerForGame,
  '1p-game': ChooseModeForOnePlayer,
  '1p-with-o-game': ChooseBoardSize,
  '1p-with-x-game': ChooseBoardSize,
  '1p-puzzle-game': ChooseBoardSize,
  '2p-game': ChooseBoardSize,
  '2p-online-game': ChooseBoardSize,
  tutorial: ChooseBoardSize,
};

export default ChooseModeLayouts;

import { ChooseModeLayoutComponent, ChooseModeUsage } from './index';

import {
  ChooseBoardSizeLayout,
  ChooseModeForOnePlayerLayout,
  ChoosePlayerForGameLayout,
} from './layouts';

const ChooseModeLayouts: Partial<
  Record<ChooseModeUsage, ChooseModeLayoutComponent>
> = {
  game: ChoosePlayerForGameLayout,
  '1p-game': ChooseModeForOnePlayerLayout,
  '1p-with-o-game': ChooseBoardSizeLayout,
  '1p-with-x-game': ChooseBoardSizeLayout,
  '1p-puzzle-game': ChooseBoardSizeLayout,
  '2p-game': ChooseBoardSizeLayout,
  '2p-online-game': ChooseBoardSizeLayout,
  tutorial: ChooseBoardSizeLayout,
};

export default ChooseModeLayouts;

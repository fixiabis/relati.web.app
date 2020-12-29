import { GameLayoutComponent, GameMode } from './index';

import {
  GameFor1PLayoutBuilder as buildGameFor1PLayout,
  GameFor2PLayout,
} from './layouts';

const GameLayouts: Partial<Record<GameMode, GameLayoutComponent>> = {
  '1p-with-o': buildGameFor1PLayout(1),
  '1p-with-x': buildGameFor1PLayout(0),
  '2p': GameFor2PLayout,
};

export default GameLayouts;

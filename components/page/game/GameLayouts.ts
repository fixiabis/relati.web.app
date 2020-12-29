import { GameLayoutComponent, GameMode } from './index';
import { GameFor2PLayout } from './layouts';

const GameLayouts: Partial<Record<GameMode, GameLayoutComponent>> = {
  '2p': GameFor2PLayout,
};

export default GameLayouts;

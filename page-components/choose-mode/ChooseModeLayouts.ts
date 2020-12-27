import { ChooseModeUsage } from './index';
import ChoosePlayerForGame from './ChoosePlayerForGame';
import ChooseModeForOnePlayer from './ChooseModeForOnePlayer';
import ChooseBoardSize from './ChooseBoardSize';

const ChooseModeLayouts: Partial<
  Record<ChooseModeUsage, React.FC<{ usage: string }>>
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

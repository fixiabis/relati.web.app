export { default as ChooseModePageStyles } from './ChooseModePage.module.css';
export { default as ChooseBoardSize } from './ChooseBoardSize';
export { default as ChoosePlayerForGame } from './ChoosePlayerForGame';
export { default as ChooseModeForOnePlayer } from './ChooseModeForOnePlayer';
export { default as ChoosePage } from './ChoosePage';
export { default as ChooseModeLayouts } from './ChooseModeLayouts';
export { default as useRedirectOnChoosed } from './useRedirectOnChoosed';

export type ChooseModeUsage =
  | 'game'
  | '1p-game'
  | '1p-with-o-game'
  | 'x5-1p-with-o-game'
  | 'x7-1p-with-o-game'
  | 'x9-1p-with-o-game'
  | '1p-with-x-game'
  | 'x5-1p-with-x-game'
  | 'x7-1p-with-x-game'
  | 'x9-1p-with-x-game'
  | '1p-puzzle-game'
  | 'x5-1p-puzzle-game'
  | 'x7-1p-puzzle-game'
  | 'x9-1p-puzzle-game'
  | '2p-game'
  | 'x5-2p-game'
  | 'x7-2p-game'
  | 'x9-2p-game'
  | '2p-online-game'
  | 'x5-2p-online-game'
  | 'x7-2p-online-game'
  | 'x9-2p-online-game'
  | 'tutorial'
  | 'x5-tutorial'
  | 'x7-tutorial'
  | 'x9-tutorial';

export type ChooseModeLayoutComponent = React.FC<{
  usage: string;
  onCancel: () => void;
}>;

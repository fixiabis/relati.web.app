export { default as GamePageStyles } from './GamePage.module.css';
export { default as GameLayouts } from './GameLayouts';
export { default as useRedirectOnNotFound } from './useRedirectOnNotFound';

export type GameMode = '1p-with-o' | '1p-with-x' | '2p' | '2p-online';

export type GameLayoutComponent = React.FC<{
  boardSize: number;
  onLeave: () => void;
}>;

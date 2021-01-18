import {
  PlayerOIconUrl,
  PlayerXIconUrl,
  PlayerDIconUrl,
  PlayerUIconUrl,
  GrayPlayerOIconUrl,
  GrayPlayerXIconUrl,
  GrayPlayerDIconUrl,
  GrayPlayerUIconUrl,
} from '../../icons';

import { Button, Icon } from '../core';
import { SlideLeftFadeInButton } from '../shared';
import { ChooseGameModeLayout } from './shared';

const toggledPieceUrls = {
  O: [GrayPlayerOIconUrl, PlayerOIconUrl],
  X: [GrayPlayerXIconUrl, PlayerXIconUrl],
  D: [GrayPlayerDIconUrl, PlayerDIconUrl],
  U: [GrayPlayerUIconUrl, PlayerUIconUrl],
};

const getPieceUrl = (piece: string, pieces: string[]) =>
  toggledPieceUrls[piece][+pieces.includes(piece)];

type PieceToggler = (piece: string) => () => void;

export const renderButtonsFor2Player = (
  pieces: string[],
  togglePiece: PieceToggler
) => (
  <Button.Group>
    <SlideLeftFadeInButton
      animationDelay="0.25s"
      title="player1"
      onClick={togglePiece('O')}
      children={<Icon url={getPieceUrl('O', pieces)} />}
    />
    <SlideLeftFadeInButton
      animationDelay="0.5s"
      title="player2"
      onClick={togglePiece('X')}
      children={<Icon url={getPieceUrl('X', pieces)} />}
    />
  </Button.Group>
);

export const renderButtonsFor3Player = (
  pieces: string[],
  togglePiece: PieceToggler
) => (
  <Button.Group>
    <SlideLeftFadeInButton
      animationDelay="0.25s"
      title="player1"
      onClick={togglePiece('O')}
      children={<Icon url={getPieceUrl('O', pieces)} />}
    />
    <SlideLeftFadeInButton
      animationDelay="0.5s"
      title="player2"
      onClick={togglePiece('X')}
      children={<Icon url={getPieceUrl('X', pieces)} />}
    />
    <SlideLeftFadeInButton
      animationDelay="0.75s"
      title="player3"
      onClick={togglePiece('D')}
      children={<Icon url={getPieceUrl('D', pieces)} />}
    />
  </Button.Group>
);

export const renderButtonsFor4Player = (
  pieces: string[],
  togglePiece: PieceToggler
) => (
  <Button.Group>
    <SlideLeftFadeInButton
      animationDelay="0.25s"
      title="player1"
      onClick={togglePiece('O')}
      children={<Icon url={getPieceUrl('O', pieces)} />}
    />
    <SlideLeftFadeInButton
      animationDelay="0.5s"
      title="player2"
      onClick={togglePiece('X')}
      children={<Icon url={getPieceUrl('X', pieces)} />}
    />
    <SlideLeftFadeInButton
      animationDelay="0.75s"
      title="player3"
      onClick={togglePiece('D')}
      children={<Icon url={getPieceUrl('D', pieces)} />}
    />
    <SlideLeftFadeInButton
      animationDelay="1s"
      title="player4"
      onClick={togglePiece('U')}
      children={<Icon url={getPieceUrl('U', pieces)} />}
    />
  </Button.Group>
);

export const buttonRendererByPlayersCount = {
  0: ChooseGameModeLayout.renderButtonsForUnknown,
  2: renderButtonsFor2Player,
  3: renderButtonsFor3Player,
  4: renderButtonsFor4Player,
};

export const defaultPiecesByPlayers = {
  2: ['O'],
  3: ['O', 'X'],
  4: ['O', 'X', 'D'],
};

export const renderButtons = (
  playersCount: number,
  pieces: string[],
  togglePiece: PieceToggler
) => buttonRendererByPlayersCount[playersCount](pieces, togglePiece);

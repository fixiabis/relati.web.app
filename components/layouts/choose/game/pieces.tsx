import {
  PlayerOIconUrl,
  PlayerXIconUrl,
  PlayerDIconUrl,
  PlayerEIconUrl,
  GrayPlayerOIconUrl,
  GrayPlayerXIconUrl,
  GrayPlayerDIconUrl,
  GrayPlayerEIconUrl,
} from '../../../../icons';

import { Button, Icon } from '../../../core';
import { SlideLeftFadeInButton } from '../../../shared';

const toggledPieceUrls = {
  O: [GrayPlayerOIconUrl, PlayerOIconUrl],
  X: [GrayPlayerXIconUrl, PlayerXIconUrl],
  D: [GrayPlayerDIconUrl, PlayerDIconUrl],
  E: [GrayPlayerEIconUrl, PlayerEIconUrl],
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
      onClick={togglePiece('E')}
      children={<Icon url={getPieceUrl('E', pieces)} />}
    />
  </Button.Group>
);

export const buttonRendererByPlayersCount = {
  2: renderButtonsFor2Player,
  3: renderButtonsFor3Player,
  4: renderButtonsFor4Player,
};

export const renderButtons = (
  playersCount: number,
  pieces: string[],
  togglePiece: PieceToggler
) => buttonRendererByPlayersCount[playersCount]?.(pieces, togglePiece);

import { Game, PieceIndex } from '../../../relati';
import { BoardForGameProps } from '../BoardForGame';
import { Piece, Player } from './types';

const useGamePlacementGridClickHandler = (
  game: Game<Player, Piece>,
  place: (pieceIndex: PieceIndex) => void,
  isPlaceable: (player: Player) => boolean
): BoardForGameProps['onGridClick'] => ({ x, y }) => {
  const playerOfTurn = game.turn % game.definition.playersCount;

  if (isPlaceable(playerOfTurn)) {
    const pieceIndex = game.definition.toPieceIndex([x, y]);
    place(pieceIndex);
  }
};

export default useGamePlacementGridClickHandler;

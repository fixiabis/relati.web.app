import { useEffect } from 'react';
import { Game, PieceIndex, Thinker } from '../../../relati';
import { Player, Piece } from './types';

const useGameThinkerPlacement = (
  thinker: Thinker<Player, Piece>,
  game: Game<Player, Piece>,
  place: (pieceIndex: PieceIndex) => void,
  isPlaceable: (player: Player) => boolean
) =>
  useEffect(() => {
    const playerOfTurn = game.turn % game.definition.playersCount;

    if (isPlaceable(playerOfTurn)) {
      setTimeout(() => {
        const pieceIndex = thinker.getPieceIndexForPlacement(game);
        place(pieceIndex);
      }, 600);
    }
  }, [game, thinker, place, isPlaceable]);

export default useGameThinkerPlacement;

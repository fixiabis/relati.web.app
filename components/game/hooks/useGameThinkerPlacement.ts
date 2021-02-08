import { useEffect } from 'react';
import { Game, PieceIndex, Thinker } from '../../../relati';
import { Player, Piece } from './types';

const useGameThinkerPlacement = (
  game: Game<Player, Piece>,
  thinker: Thinker<Player, Piece>,
  place: (pieceIndex: PieceIndex) => void,
  isThinkerPlaceable: (player: Player) => boolean
) =>
  useEffect(() => {
    const playerOfTurn = game.turn % game.definition.playersCount;

    if (isThinkerPlaceable(playerOfTurn)) {
      setTimeout(() => {
        const pieceIndex = thinker.getPieceIndexForPlacement(game);
        place(pieceIndex);
      }, 600);
    }
  }, [game, thinker, place, isThinkerPlaceable]);

export default useGameThinkerPlacement;

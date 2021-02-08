import { useEffect } from 'react';
import { EMPTY_PIECE, Game, NO_WINNER } from '../../../relati';
import { Piece, Player } from './types';

const useGamePassTurn = (game: Game<Player, Piece>, passTurn: () => void) =>
  useEffect(() => {
    const { turn, pieces } = game;
    const { pieceIndexes, playersCount } = game.definition;
    const { isPieceIndexHasProvidableRoute, getWinner } = game.rule;
    const winner = getWinner(game);

    if (turn < playersCount || winner !== NO_WINNER) {
      return;
    }

    const playerOfTurn = turn % playersCount;

    const hasPieceIndexOfPlayerPlaceable = pieceIndexes.some(
      (pieceIndex) =>
        pieces[pieceIndex] === EMPTY_PIECE &&
        isPieceIndexHasProvidableRoute(pieces, pieceIndex, playerOfTurn)
    );

    if (!hasPieceIndexOfPlayerPlaceable) {
      passTurn();
    }
  }, [game, passTurn]);

export default useGamePassTurn;

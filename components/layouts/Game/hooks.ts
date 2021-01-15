import { useMemo } from 'react';
import { GameDefinition } from '../../../relati';
import Thinker, {
  DeepThinking,
  MultiInfluencesBasedThinking,
} from '../../../relati/Thinker';
import { DirectionRoutes } from '../../../relati/values';

type Player = number;
type Piece = number;

export const useDefinition = (
  playersCount: number,
  boardWidth: number,
  boardHeight: number,
  portsCount: number
) =>
  useMemo(
    () =>
      GameDefinition<Player, Piece>(
        playersCount,
        boardWidth,
        boardHeight,
        DirectionRoutes['P' + portsCount]
      ),
    [boardWidth, boardHeight, portsCount]
  );

export const useThinker = (definition: GameDefinition<Player, Piece>) =>
  useMemo(() => {
    const multiInfluencesBasedThinking = MultiInfluencesBasedThinking(
      definition
    );

    const deepThinking = DeepThinking(multiInfluencesBasedThinking, 1);
    const thinker = Thinker(deepThinking);

    return thinker;
  }, [definition]);

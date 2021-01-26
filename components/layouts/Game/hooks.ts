import { useMemo } from 'react';
import { GameDefinition } from '../../../relati';
import Thinker, {
  DeepThinking,
  MultiInfluencesBasedThinking,
} from '../../../relati/Thinker';
import { DirectionRoute, TurretBase } from '../../../relati/values';

type Player = number;
type Piece = number;

export const useDefinition = (
  playersCount: number,
  boardWidth: number,
  boardHeight: number,
  routePortsCount: number,
  turretPortsCount: number
) =>
  useMemo(
    () =>
      GameDefinition<Player, Piece>(
        playersCount,
        boardWidth,
        boardHeight,
        DirectionRoute['P' + routePortsCount],
        TurretBase['P' + turretPortsCount]
      ),
    [boardWidth, boardHeight, routePortsCount, turretPortsCount]
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

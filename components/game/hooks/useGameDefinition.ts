import { useMemo } from 'react';
import { GameDefinition } from '../../../relati';
import { DirectionRoute, TurretBase } from '../../../relati/values';
import { Player, Piece } from './types';

const useGameDefinition = (
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
    [playersCount, boardWidth, boardHeight, routePortsCount, turretPortsCount]
  );

export default useGameDefinition;

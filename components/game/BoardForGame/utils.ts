import {
  Game,
  GameRule,
  PieceIndex,
  PieceStatus,
  Route,
} from '../../../relati';
import { PieceProps, ShapeColor } from '../Piece';

type ReadonlyRecord<K extends number | string | symbol, T> = Readonly<
  Record<K, T>
>;

export type Keyframe<Piece> = {
  type: string;
  duration: number;
  pieces: readonly Piece[];

  routesByPieceIndex: ReadonlyRecord<PieceIndex, readonly Route<PieceIndex>[]>;

  addedRoutesByPieceIndex: ReadonlyRecord<
    PieceIndex,
    readonly Route<PieceIndex>[]
  >;

  removedRoutesByPieceIndex: ReadonlyRecord<
    PieceIndex,
    readonly Route<PieceIndex>[]
  >;
};

type Player = number;

export const shapeByPlayer: Record<Player, keyof typeof ShapeColor> = [
  'O',
  'X',
  'D',
  'U',
];

export const styleByPieceStatus: Record<PieceStatus, PieceProps['style']> = {
  [PieceStatus.Unknown]: 'default',
  [PieceStatus.Producer]: 'double',
  [PieceStatus.Provider]: 'default',
  [PieceStatus.Consumer]: 'gray',
  [PieceStatus.Deceased]: 'light',
};

export const getPieceIndexToEffectMap = <
  Player extends number,
  Piece extends number
>(
  pieces: readonly Piece[],
  rule: GameRule<Player, Piece>
) => {
  const {
    players,
    pieceIndexes,
    providerPieceByPlayer,
    turretBasesByPieceIndex,
    isTargetableByPieceByPlayer,
    toCoordinate,
    toPieceIndex,
    isCoordinateValid,
  } = rule.definition;

  const { isTurretBaseFulfilled } = rule;

  const pieceIndexToEffect: Record<
    PieceIndex,
    Partial<PieceProps>
  > = pieceIndexes.map(() => ({}));

  for (const player of players) {
    for (const pieceIndex of pieceIndexes) {
      if (pieces[pieceIndex]) {
        continue;
      }

      const provider = providerPieceByPlayer[player];
      const isTargetableByPiece = isTargetableByPieceByPlayer[player];
      const turretBases = turretBasesByPieceIndex[pieceIndex];
      const [triggerX, triggerY] = toCoordinate(pieceIndex);

      for (const turretBase of turretBases) {
        const [bulletIndex] = turretBase;
        const bullet = pieces[bulletIndex];

        const isTurretFulfilled =
          bullet === provider && isTurretBaseFulfilled(pieces, turretBase, player);

        if (isTurretFulfilled) {
          let [targetIndex] = turretBase.slice(-1);
          let targetCoordinate = toCoordinate(targetIndex);
          let [targetX, targetY] = targetCoordinate;
          const deltaX = targetX - triggerX;
          const deltaY = targetY - triggerY;

          while (isCoordinateValid(targetCoordinate)) {
            const target = pieces[targetIndex];
            const isTargetTargetable = isTargetableByPiece[target];

            if (isTargetTargetable) {
              pieceIndexToEffect[targetIndex].shaking = true;

              if (!pieceIndexToEffect[pieceIndex].shape) {
                pieceIndexToEffect[pieceIndex].color =
                  ShapeColor[shapeByPlayer[player]];
              } else {
                pieceIndexToEffect[pieceIndex].color = 'purple';
              }

              pieceIndexToEffect[pieceIndex].shape = '+';
              pieceIndexToEffect[pieceIndex].bouncing = true;

              break;
            }

            targetX += deltaX;
            targetY += deltaY;
            targetCoordinate = [targetX, targetY];
            targetIndex = toPieceIndex(targetCoordinate);
          }
        }
      }
    }
  }

  return pieceIndexToEffect;
};

const getPieceIndexToRoutesMapByMutatePiecesToProvided = <
  Player extends number,
  Piece extends number
>(
  pieces: Piece[],
  providerIndexes: PieceIndex[],
  rule: GameRule<Player, Piece>
) => {
  const {
    pieceIndexes,
    playerByPiece,
    providerPieceByPlayer,
    routesByPieceIndex,
    isProvidableByPieceByPlayer,
    isConsumableByPieceByPlayer,
  } = rule.definition;

  const pieceIndexToRoutes: Record<
    PieceIndex,
    readonly Route<PieceIndex>[]
  > = pieceIndexes.map(() => []);

  for (const pieceIndex of providerIndexes) {
    const piece = pieces[pieceIndex];
    const player = playerByPiece[piece] as Player;
    const isProvidableByPiece = isProvidableByPieceByPlayer[player];

    if (isProvidableByPiece[piece]) {
      const providerPiece = providerPieceByPlayer[player];
      const routes = routesByPieceIndex[pieceIndex];
      const isConsumableByPiece = isConsumableByPieceByPlayer[player];
      const providedRoutes: Route<PieceIndex>[] = [];

      for (const route of routes) {
        const [pieceIndex] = route;
        const piece = pieces[pieceIndex];

        const isRouteConsumable =
          isConsumableByPiece[piece] && rule.isRouteAvailable(pieces, route);

        if (isRouteConsumable) {
          pieces[pieceIndex] = providerPiece;
          providerIndexes.push(pieceIndex);
          providedRoutes.push(route);
        }
      }

      pieceIndexToRoutes[pieceIndex] = providedRoutes;
    }
  }

  return pieceIndexToRoutes;
};

export const getKeyframesOfEffect = <
  Player extends number,
  Piece extends number
>(
  prevGame: Game<Player, Piece>,
  game: Game<Player, Piece>
) => {
  const { definition } = game;
  const { pieceIndexes } = definition;

  const prevPieces = [...prevGame.pieces];
  const prevProviderPieceIndexes = [...prevGame.producerIndexes];
  const pieces = [...game.pieces];
  const providerPieceIndexes = [...game.producerIndexes];

  prevGame.rule.mutatePiecesToConsumed(prevPieces);
  game.rule.mutatePiecesToConsumed(pieces);

  const prevRoutesByPieceIndex = getPieceIndexToRoutesMapByMutatePiecesToProvided(
    prevPieces,
    prevProviderPieceIndexes,
    prevGame.rule
  );

  const routesByPieceIndex = getPieceIndexToRoutesMapByMutatePiecesToProvided(
    pieces,
    providerPieceIndexes,
    game.rule
  );

  const prevStepByPieceIndex: Record<PieceIndex, number> = pieceIndexes.map(
    () => -1
  );

  const stepByPieceIndex: Record<PieceIndex, number> = pieceIndexes.map(
    () => -1
  );

  const prevPieceIndexesOfSteps: PieceIndex[][] = [[]];
  const pieceIndexesOfSteps: PieceIndex[][] = [[]];

  const unchangedRoutesByPieceIndex: Record<
    PieceIndex,
    readonly Route<PieceIndex>[]
  > = [];

  const addedRoutesByPieceIndex: Record<
    PieceIndex,
    readonly Route<PieceIndex>[]
  > = [];

  const removedRoutesByPieceIndex: Record<
    PieceIndex,
    readonly Route<PieceIndex>[]
  > = [];

  for (const pieceIndex of pieceIndexes) {
    const prevRoutes = prevRoutesByPieceIndex[pieceIndex];
    const routes = routesByPieceIndex[pieceIndex];

    const isRouteInPrevRoutes = (route: Route<PieceIndex>) =>
      prevRoutes.includes(route);

    const isRouteNotInPrevRoutes = (route: Route<PieceIndex>) =>
      !prevRoutes.includes(route);

    const isRouteNotInRoutes = (route: Route<PieceIndex>) =>
      !routes.includes(route);

    const unchangedRoutes = routes.filter(isRouteInPrevRoutes);

    const addedRoutes = routes.filter(isRouteNotInPrevRoutes);

    const removedRoutes = prevRoutes.filter(isRouteNotInRoutes);

    unchangedRoutesByPieceIndex[pieceIndex] = unchangedRoutes;

    addedRoutesByPieceIndex[pieceIndex] = addedRoutes;
    removedRoutesByPieceIndex[pieceIndex] = removedRoutes;
  }

  for (const pieceIndex of prevGame.producerIndexes) {
    prevStepByPieceIndex[pieceIndex] = 0;
    prevPieceIndexesOfSteps[0].push(pieceIndex);
  }

  for (const pieceIndex of game.producerIndexes) {
    stepByPieceIndex[pieceIndex] = 0;
    pieceIndexesOfSteps[0].push(pieceIndex);
  }

  for (const pieceIndex of prevProviderPieceIndexes) {
    const step = prevStepByPieceIndex[pieceIndex] + 1;
    const routes = prevRoutesByPieceIndex[pieceIndex];
    prevPieceIndexesOfSteps[step] = prevPieceIndexesOfSteps[step] || [];

    for (const [pieceIndex] of routes) {
      prevStepByPieceIndex[pieceIndex] = step;
      prevPieceIndexesOfSteps[step].push(pieceIndex);
    }
  }

  for (const pieceIndex of providerPieceIndexes) {
    const step = stepByPieceIndex[pieceIndex] + 1;
    const routes = routesByPieceIndex[pieceIndex];
    pieceIndexesOfSteps[step] = pieceIndexesOfSteps[step] || [];

    for (const [pieceIndex] of routes) {
      stepByPieceIndex[pieceIndex] = step;
      pieceIndexesOfSteps[step].push(pieceIndex);
    }
  }

  while (pieceIndexesOfSteps.length < prevPieceIndexesOfSteps.length) {
    pieceIndexesOfSteps.push([]);
  }

  while (prevPieceIndexesOfSteps.length < pieceIndexesOfSteps.length) {
    prevPieceIndexesOfSteps.push([]);
  }

  const keyframes: Keyframe<Piece>[] = [
    {
      type: 'initial',

      /** @todo 抹殺特效，目前是直接消除 */
      pieces: prevGame.pieces.map((piece, pieceIndex) => {
        if (
          game.definition.getStatus(game.pieces[pieceIndex]) ===
          PieceStatus.Deceased
        ) {
          return game.pieces[pieceIndex];
        }

        return piece ? piece : game.pieces[pieceIndex];
      }),
      routesByPieceIndex: prevRoutesByPieceIndex,
      addedRoutesByPieceIndex: (prevRoutesByPieceIndex as PieceIndex[][][]).map(
        () => []
      ),
      removedRoutesByPieceIndex: (prevRoutesByPieceIndex as PieceIndex[][][]).map(
        () => []
      ),
      duration: 0,
    },
  ];

  for (let step = 0; step < pieceIndexesOfSteps.length; step++) {
    const prevPieceIndexes = prevPieceIndexesOfSteps[step];
    const pieceIndexes = pieceIndexesOfSteps[step];

    const isPieceIndexInPrevPieceIndexes = (pieceIndex: PieceIndex) =>
      prevPieceIndexes.includes(pieceIndex);

    const isPieceIndexNotInPrevPieceIndexes = (pieceIndex: PieceIndex) =>
      !prevPieceIndexes.includes(pieceIndex);

    const isPieceIndexNotInPieceIndexes = (pieceIndex: PieceIndex) =>
      !pieceIndexes.includes(pieceIndex);

    const unchangedPieceIndexes = pieceIndexes.filter(
      isPieceIndexInPrevPieceIndexes
    );

    const addedPieceIndexes = pieceIndexes.filter(
      isPieceIndexNotInPrevPieceIndexes
    );

    const removedPieceIndexes = prevPieceIndexes.filter(
      isPieceIndexNotInPieceIndexes
    );

    const unchangedAndRemovedPieceIndexes = [
      ...unchangedPieceIndexes,
      ...removedPieceIndexes,
    ];

    const unchangedAndAddedPieceIndexes = [
      ...unchangedPieceIndexes,
      ...addedPieceIndexes,
    ];

    if (addedPieceIndexes.length > 0) {
      const keyframe = keyframes[keyframes.length - 1];
      const pieces = [...keyframe.pieces];

      for (const pieceIndex of addedPieceIndexes) {
        pieces[pieceIndex] = game.pieces[pieceIndex];
      }

      keyframes.push({
        ...keyframe,
        type: 'added-pieces',
        pieces,
        duration: 0,
      });
    }

    if (unchangedAndAddedPieceIndexes.length > 0) {
      const keyframe = keyframes[keyframes.length - 1];

      const routesByPieceIndex = [
        ...(keyframe.routesByPieceIndex as (readonly Route<PieceIndex>[])[]),
      ];

      const addedRoutesByPieceIndexOfKeyframe = [
        ...(keyframe.addedRoutesByPieceIndex as (readonly Route<PieceIndex>[])[]),
      ];

      let hasRouteAdded = false;

      for (const pieceIndex of unchangedAndAddedPieceIndexes) {
        const addedRoutes = addedRoutesByPieceIndex[pieceIndex];

        if (addedRoutes.length > 0) {
          hasRouteAdded = true;

          addedRoutesByPieceIndexOfKeyframe[pieceIndex] = addedRoutes;
        }
      }

      if (hasRouteAdded) {
        keyframes.push({
          ...keyframe,
          type: 'added-routes',
          routesByPieceIndex,
          addedRoutesByPieceIndex: addedRoutesByPieceIndexOfKeyframe,
          duration: 500,
        });

        keyframes.push({
          ...keyframe,
          type: 'added-routes to routes',
          routesByPieceIndex: routesByPieceIndex.map((routes, pieceIndex) =>
            routes.concat(addedRoutesByPieceIndexOfKeyframe[pieceIndex])
          ),
          addedRoutesByPieceIndex: addedRoutesByPieceIndexOfKeyframe.map(
            () => []
          ),
          duration: 0,
        });
      }
    }

    if (removedPieceIndexes.length > 0) {
      const keyframe = keyframes[keyframes.length - 1];
      const pieces = [...keyframe.pieces];

      for (const pieceIndex of removedPieceIndexes) {
        pieces[pieceIndex] = game.pieces[pieceIndex];
      }

      keyframes.push({
        ...keyframe,
        type: 'removed-pieces',
        pieces,
        duration: 0,
      });
    }

    if (unchangedAndRemovedPieceIndexes.length > 0) {
      const keyframe = keyframes[keyframes.length - 1];

      const routesByPieceIndex = [
        ...(keyframe.routesByPieceIndex as (readonly Route<PieceIndex>[])[]),
      ];

      const removedRoutesByPieceIndexOfKeyframe = [
        ...(keyframe.removedRoutesByPieceIndex as (readonly Route<PieceIndex>[])[]),
      ];

      let hasRouteRemoved = false;

      for (const pieceIndex of unchangedAndRemovedPieceIndexes) {
        const removedRoutes = removedRoutesByPieceIndex[pieceIndex];

        if (removedRoutes.length > 0) {
          hasRouteRemoved = true;

          removedRoutesByPieceIndexOfKeyframe[pieceIndex] = removedRoutes;

          routesByPieceIndex[pieceIndex] = routesByPieceIndex[
            pieceIndex
          ].filter((route) => !removedRoutes.includes(route));
        }
      }

      if (hasRouteRemoved) {
        keyframes.push({
          ...keyframe,
          type: 'removed-routes',
          routesByPieceIndex,
          removedRoutesByPieceIndex: removedRoutesByPieceIndexOfKeyframe,
          duration: 500,
        });
      }
    }
  }

  return keyframes;
};

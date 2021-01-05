import {
  Game,
  GameRule,
  isPieceIndexRouteAvailable,
  PieceIndex,
  Route,
} from '../../../relati';

type ReadonlyRecord<K extends number | string | symbol, T> = Readonly<
  Record<K, T>
>;

export type Keyframe<Piece> = {
  type: string;
  duration: number;
  pieces: readonly Piece[];

  pieceIndexRoutesByPieceIndex: ReadonlyRecord<
    PieceIndex,
    readonly Route<PieceIndex>[]
  >;

  addedPieceIndexRoutesByPieceIndex: ReadonlyRecord<
    PieceIndex,
    readonly Route<PieceIndex>[]
  >;

  removedPieceIndexRoutesByPieceIndex: ReadonlyRecord<
    PieceIndex,
    readonly Route<PieceIndex>[]
  >;
};

const getPieceIndexToPieceIndexRoutesMapByMutatePiecesToProvided = <
  Player extends number,
  Piece extends number
>(
  pieces: Piece[],
  providerPieceIndexes: PieceIndex[],
  rule: GameRule<Player, Piece>
) => {
  const {
    pieceIndexes,
    playerByPiece,
    providerPieceByPlayer,
    pieceIndexRoutesByPieceIndex,
    isConsumableByPieceByPlayer,
  } = rule.definition;

  const pieceIndexToPieceIndexRoutes: Record<
    PieceIndex,
    readonly Route<PieceIndex>[]
  > = pieceIndexes.map(() => []);

  for (const pieceIndex of providerPieceIndexes) {
    const piece = pieces[pieceIndex];
    const player = playerByPiece[piece] as Player;
    const providerPiece = providerPieceByPlayer[player];
    const pieceIndexRoutes = pieceIndexRoutesByPieceIndex[pieceIndex];
    const isConsumableByPiece = isConsumableByPieceByPlayer[player];
    const providedPieceIndexRoutes: Route<PieceIndex>[] = [];

    for (const pieceIndexRoute of pieceIndexRoutes) {
      const [pieceIndex] = pieceIndexRoute;
      const piece = pieces[pieceIndex];

      const isPieceIndexRouteConsumable =
        isConsumableByPiece[piece] &&
        isPieceIndexRouteAvailable<Piece>(pieces, pieceIndexRoute);

      if (isPieceIndexRouteConsumable) {
        pieces[pieceIndex] = providerPiece;
        providerPieceIndexes.push(pieceIndex);
        providedPieceIndexRoutes.push(pieceIndexRoute);
      }
    }

    pieceIndexToPieceIndexRoutes[pieceIndex] = providedPieceIndexRoutes;
  }

  return pieceIndexToPieceIndexRoutes;
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
  const prevProviderPieceIndexes = [...prevGame.producerPieceIndexes];
  const pieces = [...game.pieces];
  const providerPieceIndexes = [...game.producerPieceIndexes];

  prevGame.rule.mutatePiecesToConsumed(prevPieces);
  game.rule.mutatePiecesToConsumed(pieces);

  const prevPieceIndexRoutesByPieceIndex = getPieceIndexToPieceIndexRoutesMapByMutatePiecesToProvided(
    prevPieces,
    prevProviderPieceIndexes,
    prevGame.rule
  );

  const pieceIndexRoutesByPieceIndex = getPieceIndexToPieceIndexRoutesMapByMutatePiecesToProvided(
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

  const unchangedPieceIndexRoutesByPieceIndex: Record<
    PieceIndex,
    readonly Route<PieceIndex>[]
  > = [];

  const addedPieceIndexRoutesByPieceIndex: Record<
    PieceIndex,
    readonly Route<PieceIndex>[]
  > = [];

  const removedPieceIndexRoutesByPieceIndex: Record<
    PieceIndex,
    readonly Route<PieceIndex>[]
  > = [];

  for (const pieceIndex of pieceIndexes) {
    const prevPieceIndexRoutes = prevPieceIndexRoutesByPieceIndex[pieceIndex];
    const pieceIndexRoutes = pieceIndexRoutesByPieceIndex[pieceIndex];

    const isPieceIndexRouteInPrevPieceIndexRoutes = (
      pieceIndexRoute: Route<PieceIndex>
    ) => prevPieceIndexRoutes.includes(pieceIndexRoute);

    const isPieceIndexRouteNotInPrevPieceIndexRoutes = (
      pieceIndexRoute: Route<PieceIndex>
    ) => !prevPieceIndexRoutes.includes(pieceIndexRoute);

    const isPieceIndexRouteNotInPieceIndexRoutes = (
      pieceIndexRoute: Route<PieceIndex>
    ) => !pieceIndexRoutes.includes(pieceIndexRoute);

    const unchangedPieceIndexRoutes = pieceIndexRoutes.filter(
      isPieceIndexRouteInPrevPieceIndexRoutes
    );

    const addedPieceIndexRoutes = pieceIndexRoutes.filter(
      isPieceIndexRouteNotInPrevPieceIndexRoutes
    );

    const removedPieceIndexRoutes = prevPieceIndexRoutes.filter(
      isPieceIndexRouteNotInPieceIndexRoutes
    );

    unchangedPieceIndexRoutesByPieceIndex[
      pieceIndex
    ] = unchangedPieceIndexRoutes;

    addedPieceIndexRoutesByPieceIndex[pieceIndex] = addedPieceIndexRoutes;
    removedPieceIndexRoutesByPieceIndex[pieceIndex] = removedPieceIndexRoutes;
  }

  for (const pieceIndex of prevGame.producerPieceIndexes) {
    prevStepByPieceIndex[pieceIndex] = 0;
    prevPieceIndexesOfSteps[0].push(pieceIndex);
  }

  for (const pieceIndex of game.producerPieceIndexes) {
    stepByPieceIndex[pieceIndex] = 0;
    pieceIndexesOfSteps[0].push(pieceIndex);
  }

  for (const pieceIndex of prevProviderPieceIndexes) {
    const step = prevStepByPieceIndex[pieceIndex] + 1;
    const pieceIndexRoutes = prevPieceIndexRoutesByPieceIndex[pieceIndex];
    prevPieceIndexesOfSteps[step] = prevPieceIndexesOfSteps[step] || [];

    for (const [pieceIndex] of pieceIndexRoutes) {
      prevStepByPieceIndex[pieceIndex] = step;
      prevPieceIndexesOfSteps[step].push(pieceIndex);
    }
  }

  for (const pieceIndex of providerPieceIndexes) {
    const step = stepByPieceIndex[pieceIndex] + 1;
    const pieceIndexRoutes = pieceIndexRoutesByPieceIndex[pieceIndex];
    pieceIndexesOfSteps[step] = pieceIndexesOfSteps[step] || [];

    for (const [pieceIndex] of pieceIndexRoutes) {
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
      pieces: prevGame.pieces.map((piece, pieceIndex) =>
        piece ? piece : game.pieces[pieceIndex]
      ),
      pieceIndexRoutesByPieceIndex: prevPieceIndexRoutesByPieceIndex,
      addedPieceIndexRoutesByPieceIndex: (prevPieceIndexRoutesByPieceIndex as PieceIndex[][][]).map(
        () => []
      ),
      removedPieceIndexRoutesByPieceIndex: (prevPieceIndexRoutesByPieceIndex as PieceIndex[][][]).map(
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

      const pieceIndexRoutesByPieceIndex = [
        ...(keyframe.pieceIndexRoutesByPieceIndex as (readonly Route<PieceIndex>[])[]),
      ];

      const addedPieceIndexRoutesByPieceIndexOfKeyframe = [
        ...(keyframe.addedPieceIndexRoutesByPieceIndex as (readonly Route<PieceIndex>[])[]),
      ];

      let hasPieceIndexRouteAdded = false;

      for (const pieceIndex of unchangedAndAddedPieceIndexes) {
        const addedPieceIndexRoutes =
          addedPieceIndexRoutesByPieceIndex[pieceIndex];

        if (addedPieceIndexRoutes.length > 0) {
          hasPieceIndexRouteAdded = true;

          addedPieceIndexRoutesByPieceIndexOfKeyframe[
            pieceIndex
          ] = addedPieceIndexRoutes;
        }
      }

      if (hasPieceIndexRouteAdded) {
        keyframes.push({
          ...keyframe,
          type: 'added-routes',
          pieceIndexRoutesByPieceIndex,
          addedPieceIndexRoutesByPieceIndex: addedPieceIndexRoutesByPieceIndexOfKeyframe,
          duration: 500,
        });

        keyframes.push({
          ...keyframe,
          type: 'added-routes to routes',
          pieceIndexRoutesByPieceIndex: pieceIndexRoutesByPieceIndex.map(
            (pieceIndexRoutes, pieceIndex) =>
              pieceIndexRoutes.concat(
                addedPieceIndexRoutesByPieceIndexOfKeyframe[pieceIndex]
              )
          ),
          addedPieceIndexRoutesByPieceIndex: addedPieceIndexRoutesByPieceIndexOfKeyframe.map(
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

      const pieceIndexRoutesByPieceIndex = [
        ...(keyframe.pieceIndexRoutesByPieceIndex as (readonly Route<PieceIndex>[])[]),
      ];

      const removedPieceIndexRoutesByPieceIndexOfKeyframe = [
        ...(keyframe.removedPieceIndexRoutesByPieceIndex as (readonly Route<PieceIndex>[])[]),
      ];

      let hasPieceIndexRouteRemoved = false;

      for (const pieceIndex of unchangedAndRemovedPieceIndexes) {
        const removedPieceIndexRoutes =
          removedPieceIndexRoutesByPieceIndex[pieceIndex];

        if (removedPieceIndexRoutes.length > 0) {
          hasPieceIndexRouteRemoved = true;

          removedPieceIndexRoutesByPieceIndexOfKeyframe[
            pieceIndex
          ] = removedPieceIndexRoutes;

          pieceIndexRoutesByPieceIndex[
            pieceIndex
          ] = pieceIndexRoutesByPieceIndex[pieceIndex].filter(
            (pieceIndexRoute) =>
              !removedPieceIndexRoutes.includes(pieceIndexRoute)
          );
        }
      }

      if (hasPieceIndexRouteRemoved) {
        keyframes.push({
          ...keyframe,
          type: 'removed-routes',
          pieceIndexRoutesByPieceIndex,
          removedPieceIndexRoutesByPieceIndex: removedPieceIndexRoutesByPieceIndexOfKeyframe,
          duration: 500,
        });
      }
    }
  }

  return keyframes;
};

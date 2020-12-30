import {
  Game,
  GameRule,
  isPieceIndexRouteAvailable,
  PieceIndex,
} from '../../relati';

const getRecordsOfStepsByMutatePiecesToProvided = <
  Player extends number,
  Piece extends number
>(
  pieces: Piece[],
  providerPieceIndex: PieceIndex,
  rule: GameRule<Player, Piece>
) => {
  const {
    playerByPiece,
    providerPieceByPlayer,
    pieceIndexRoutesByPieceIndex,
    isConsumableByPieceByPlayer,
  } = rule.definition;

  const recordsByStep: {
    pieceIndex: PieceIndex;
    pieceIndexRoutes: (readonly PieceIndex[])[];
  }[][] = [[{ pieceIndex: providerPieceIndex, pieceIndexRoutes: [] }]];

  for (const records of recordsByStep) {
    const recordsOfStep = [];

    for (const record of records) {
      const { pieceIndex } = record;
      const piece = pieces[pieceIndex];
      const player = playerByPiece[piece] as Player;
      const providerPiece = providerPieceByPlayer[player];
      const pieceIndexRoutes = pieceIndexRoutesByPieceIndex[pieceIndex];
      const isConsumableByPiece = isConsumableByPieceByPlayer[player];

      for (const pieceIndexRoute of pieceIndexRoutes) {
        const [pieceIndex] = pieceIndexRoute;
        const piece = pieces[pieceIndex];

        const isPieceIndexRouteConsumable =
          isConsumableByPiece[piece] &&
          isPieceIndexRouteAvailable<Piece>(pieces, pieceIndexRoute);

        if (isPieceIndexRouteConsumable) {
          pieces[pieceIndex] = providerPiece;
          record.pieceIndexRoutes.push(pieceIndexRoute);
          recordsOfStep.push({ pieceIndex, pieceIndexRoutes: [] });
        }
      }
    }

    if (recordsOfStep.length > 0) {
      recordsByStep.push(recordsOfStep);
    }
  }

  return recordsByStep;
};

export const getStepToPlayerToDiffRecordMap = <
  Player extends number,
  Piece extends number
>(
  prevRecordsByStepByPlayer: {
    pieceIndex: PieceIndex;
    pieceIndexRoutes: (readonly PieceIndex[])[];
  }[][][],
  recordsByStepByPlayer: {
    pieceIndex: PieceIndex;
    pieceIndexRoutes: (readonly PieceIndex[])[];
  }[][][],
  playersCount: number
) => {
  const stepsCount = Math.max(
    ...prevRecordsByStepByPlayer.map(({ length }) => length),
    ...recordsByStepByPlayer.map(({ length }) => length)
  );

  for (let player = 0; player < playersCount; player++) {
    const prevRecordsByStep = prevRecordsByStepByPlayer[player];
    const recordsByStep = recordsByStepByPlayer[player];

    while (prevRecordsByStep.length < stepsCount) {
      prevRecordsByStep.push([]);
    }

    while (recordsByStep.length < stepsCount) {
      recordsByStep.push([]);
    }
  }

  const stepToPlayerToDiffRecordMap: {
    pieceIndexes: number[];
    addedPieceIndexes: number[];
    removedPieceIndexes: number[];
    pieceIndexRoutes: (readonly number[])[];
    addedPieceIndexRoutes: (readonly number[])[];
    removedPieceIndexRoutes: (readonly number[])[];
  }[][] = [];

  for (let step = 0; step < stepsCount; step++) {
    const playerToDiffRecordMap = [];

    for (let player = 0; player < playersCount; player++) {
      const prevRecords = prevRecordsByStepByPlayer[player][step];
      const records = recordsByStepByPlayer[player][step];

      const diffRecord = {
        pieceIndexes: [],
        addedPieceIndexes: [],
        removedPieceIndexes: [],
        pieceIndexRoutes: [],
        addedPieceIndexRoutes: [],
        removedPieceIndexRoutes: [],
      };

      for (const {
        pieceIndex: prevPieceIndex,
        pieceIndexRoutes: prevPieceIndexRoutes,
      } of prevRecords) {
        for (const { pieceIndex, pieceIndexRoutes } of records) {
          if (pieceIndex === prevPieceIndex) {
            diffRecord.pieceIndexes.push(pieceIndex);

            for (const prevPieceIndexRoute of prevPieceIndexRoutes) {
              for (const pieceIndexRoute of pieceIndexRoutes) {
                if (pieceIndexRoute === prevPieceIndexRoute) {
                  diffRecord.pieceIndexRoutes.push([
                    ...pieceIndexRoute,
                    pieceIndex,
                  ]);
                }
              }
            }

            for (const pieceIndexRoute of pieceIndexRoutes) {
              if (
                diffRecord.pieceIndexRoutes.findIndex(
                  (pieceIndexRouteOfRecord) =>
                    pieceIndexRoute.every(
                      (pieceIndex: number, index: number) =>
                        pieceIndex === pieceIndexRouteOfRecord[index]
                    )
                ) === -1
              ) {
                diffRecord.addedPieceIndexRoutes.push([
                  ...pieceIndexRoute,
                  pieceIndex,
                ]);
              }
            }

            for (const prevPieceIndexRoute of prevPieceIndexRoutes) {
              if (
                diffRecord.pieceIndexRoutes.findIndex(
                  (pieceIndexRouteOfRecord) =>
                    prevPieceIndexRoute.every(
                      (pieceIndex: number, index: number) =>
                        pieceIndex === pieceIndexRouteOfRecord[index]
                    )
                ) === -1
              ) {
                diffRecord.removedPieceIndexRoutes.push([
                  ...prevPieceIndexRoute,
                  pieceIndex,
                ]);
              }
            }
          }
        }
      }

      for (const { pieceIndex, pieceIndexRoutes } of records) {
        if (!diffRecord.pieceIndexes.includes(pieceIndex)) {
          diffRecord.addedPieceIndexes.push(pieceIndex);

          for (const pieceIndexRoute of pieceIndexRoutes) {
            diffRecord.addedPieceIndexRoutes.push([
              ...pieceIndexRoute,
              pieceIndex,
            ]);
          }
        }
      }

      for (const { pieceIndex, pieceIndexRoutes } of prevRecords) {
        if (!diffRecord.pieceIndexes.includes(pieceIndex)) {
          diffRecord.removedPieceIndexes.push(pieceIndex);

          for (const pieceIndexRoute of pieceIndexRoutes) {
            diffRecord.removedPieceIndexRoutes.push([
              ...pieceIndexRoute,
              pieceIndex,
            ]);
          }
        }
      }

      playerToDiffRecordMap[player] = diffRecord;
    }

    stepToPlayerToDiffRecordMap[step] = playerToDiffRecordMap;
  }

  return stepToPlayerToDiffRecordMap;
};

export const getKeyframesOfEffect = <
  Player extends number,
  Piece extends number
>(
  prevGame: Game<Player, Piece>,
  game: Game<Player, Piece>
) => {
  const { playersCount, players } = game.rule.definition;
  const prevPieces = [...prevGame.pieces];
  const pieces = [...game.pieces];

  prevGame.rule.mutatePiecesToConsumed(prevPieces);
  game.rule.mutatePiecesToConsumed(pieces);

  const prevRecordsByStepByPlayer = prevGame.producerPieceIndexes.map(
    (producerPieceIndex: PieceIndex) =>
      getRecordsOfStepsByMutatePiecesToProvided(
        prevPieces,
        producerPieceIndex,
        prevGame.rule
      )
  );

  const recordsByStepByPlayer = game.producerPieceIndexes.map(
    (producerPieceIndex: PieceIndex) =>
      getRecordsOfStepsByMutatePiecesToProvided(
        pieces,
        producerPieceIndex,
        game.rule
      )
  );

  while (prevRecordsByStepByPlayer.length < playersCount) {
    prevRecordsByStepByPlayer.push([]);
  }

  while (recordsByStepByPlayer.length < playersCount) {
    recordsByStepByPlayer.push([]);
  }

  const diffRecordByPlayerByStep = getStepToPlayerToDiffRecordMap(
    prevRecordsByStepByPlayer,
    recordsByStepByPlayer,
    playersCount
  );

  let pieceIndexesByPlayer: number[][] = players.map(() => []);
  let removedPieceIndexesByPlayer: number[][] = players.map(() => []);
  let addedPieceIndexesByPlayer: number[][] = players.map(() => []);

  let pieceIndexRoutesByPlayer: (readonly number[])[][] = players.map(() => []);

  let removedPieceIndexRoutesByPlayer: (readonly number[])[][] = players.map(
    () => []
  );

  let addedPieceIndexRoutesByPlayer: (readonly number[])[][] = players.map(
    () => []
  );

  const keyframes = [];

  for (const player of players) {
    const prevRecordsByStep = prevRecordsByStepByPlayer[player];

    for (const prevRecords of prevRecordsByStep) {
      for (const prevRecord of prevRecords) {
        pieceIndexesByPlayer[player] = pieceIndexesByPlayer[player].concat([
          prevRecord.pieceIndex,
        ]);

        pieceIndexRoutesByPlayer[player] = pieceIndexRoutesByPlayer[
          player
        ].concat(
          prevRecord.pieceIndexRoutes.map((pieceIndexRoute) => [
            ...pieceIndexRoute,
            prevRecord.pieceIndex,
          ])
        );
      }
    }
  }

  keyframes.push({
    pieceIndexesByPlayer,
    pieceIndexRoutesByPlayer,
    removedPieceIndexesByPlayer,
    removedPieceIndexRoutesByPlayer,
    addedPieceIndexesByPlayer,
    addedPieceIndexRoutesByPlayer,
  });

  for (const diffRecordByPlayer of diffRecordByPlayerByStep) {
    pieceIndexesByPlayer = [...pieceIndexesByPlayer];
    removedPieceIndexesByPlayer = [...removedPieceIndexesByPlayer];
    addedPieceIndexesByPlayer = [...addedPieceIndexesByPlayer];
    pieceIndexRoutesByPlayer = [...pieceIndexRoutesByPlayer];
    removedPieceIndexRoutesByPlayer = [...removedPieceIndexRoutesByPlayer];
    addedPieceIndexRoutesByPlayer = [...addedPieceIndexRoutesByPlayer];

    for (const player of players) {
      const diffRecord = diffRecordByPlayer[player];

      removedPieceIndexesByPlayer[player] = diffRecord.removedPieceIndexes;
      addedPieceIndexesByPlayer[player] = diffRecord.addedPieceIndexes;

      pieceIndexesByPlayer[player] = pieceIndexesByPlayer[player].filter(
        (pieceIndex) => !diffRecord.removedPieceIndexes.includes(pieceIndex)
      );

      pieceIndexesByPlayer[player] = pieceIndexesByPlayer[player].concat(
        diffRecord.addedPieceIndexes
      );

      removedPieceIndexRoutesByPlayer[player] =
        diffRecord.removedPieceIndexRoutes;

      addedPieceIndexRoutesByPlayer[player] = diffRecord.addedPieceIndexRoutes;

      pieceIndexRoutesByPlayer[player] = pieceIndexRoutesByPlayer[
        player
      ].filter(
        (pieceIndexRoute) =>
          diffRecord.removedPieceIndexRoutes.findIndex(
            (removedPieceIndexRoute) =>
              removedPieceIndexRoute.every(
                (pieceIndex, index) => pieceIndex === pieceIndexRoute[index]
              )
          ) !== -1
      );

      pieceIndexRoutesByPlayer[player] = pieceIndexRoutesByPlayer[
        player
      ].concat(diffRecord.addedPieceIndexRoutes);
    }

    keyframes.push({
      pieceIndexesByPlayer,
      pieceIndexRoutesByPlayer,
      removedPieceIndexesByPlayer,
      removedPieceIndexRoutesByPlayer,
      addedPieceIndexesByPlayer,
      addedPieceIndexRoutesByPlayer,
    });
  }

  return keyframes;
};

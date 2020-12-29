import {
  Game,
  GameRule,
  isPieceIndexRouteAvailable,
  PieceIndex,
} from '../../relati';

const getRecordsOfEachSerialByMutatePiecesToProvided = <
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

  const serialToRecords = [
    [{ pieceIndex: providerPieceIndex, pieceIndexRoutes: [] }],
  ];

  for (let serial = 0; ; serial++) {
    const records = serialToRecords[serial];
    const nextRecords = [];

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
          nextRecords.push({ pieceIndex, pieceIndexRoutes: [] });
        }
      }
    }

    if (nextRecords.length === 0) {
      break;
    }

    serialToRecords[serial + 1] = nextRecords;
  }

  return serialToRecords;
};

const createKeyframes = <Player extends number, Piece extends number>(
  prevGame: Game<Player, Piece>,
  game: Game<Player, Piece>
) => {
  const prevPieces = [...prevGame.pieces];
  const pieces = [...game.pieces];

  prevGame.rule.mutatePiecesToConsumed(prevPieces);
  game.rule.mutatePiecesToConsumed(pieces);

  const prevRecordsBySerialByPlayer = prevGame.producerPieceIndexes.map(
    (producerPieceIndex: PieceIndex) =>
      getRecordsOfEachSerialByMutatePiecesToProvided(
        prevPieces,
        producerPieceIndex,
        prevGame.rule
      )
  );

  const recordsBySerialByPlayer = game.producerPieceIndexes.map(
    (producerPieceIndex: PieceIndex) =>
      getRecordsOfEachSerialByMutatePiecesToProvided(
        pieces,
        producerPieceIndex,
        game.rule
      )
  );

  if (!prevRecordsBySerialByPlayer.length || !recordsBySerialByPlayer.length) {
    return;
  }

  const playersCount = Math.max(
    prevRecordsBySerialByPlayer.length,
    recordsBySerialByPlayer.length
  );

  const keyframesOfPlayers = [];

  let maxSerialCount = 0;

  for (let player = 0; player < playersCount; player++) {
    const prevRecordsBySerial = prevRecordsBySerialByPlayer[player] || [];
    const recordsBySerial = recordsBySerialByPlayer[player] || [];
    const keyframes = [];

    const serialCount = Math.max(
      prevRecordsBySerial.length,
      recordsBySerial.length
    );

    maxSerialCount = Math.max(serialCount, maxSerialCount);

    for (let serial = 0; serial < serialCount; serial++) {
      const prevRecords = prevRecordsBySerial[serial] || [];
      const records = recordsBySerial[serial] || [];

      const keyframe = {
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
            keyframe.pieceIndexes.push(pieceIndex);

            for (const prevPieceIndexRoute of prevPieceIndexRoutes) {
              for (const pieceIndexRoute of pieceIndexRoutes) {
                if (pieceIndexRoute === prevPieceIndexRoute) {
                  keyframe.pieceIndexRoutes.push(pieceIndexRoute);
                }
              }
            }

            for (const pieceIndexRoute of pieceIndexRoutes) {
              if (!keyframe.pieceIndexRoutes.includes(pieceIndexRoute)) {
                keyframe.addedPieceIndexRoutes.push(pieceIndexRoute);
              }
            }

            for (const prevPieceIndexRoute of prevPieceIndexRoutes) {
              if (!keyframe.pieceIndexRoutes.includes(prevPieceIndexRoute)) {
                keyframe.removedPieceIndexRoutes.push(prevPieceIndexRoute);
              }
            }
          }
        }
      }

      for (const { pieceIndex, pieceIndexRoutes } of records) {
        if (!keyframe.pieceIndexes.includes(pieceIndex)) {
          keyframe.addedPieceIndexes.push(pieceIndex);

          for (const pieceIndexRoute of pieceIndexRoutes) {
            keyframe.addedPieceIndexRoutes.push(pieceIndexRoute);
          }
        }
      }

      for (const { pieceIndex, pieceIndexRoutes } of prevRecords) {
        if (!keyframe.pieceIndexes.includes(pieceIndex)) {
          keyframe.removedPieceIndexes.push(pieceIndex);

          for (const pieceIndexRoute of pieceIndexRoutes) {
            keyframe.removedPieceIndexRoutes.push(pieceIndexRoute);
          }
        }
      }

      keyframes.push(keyframe);
    }

    keyframesOfPlayers[player] = keyframes;
  }

  const keyframes = [];

  for (let serial = 0; serial < maxSerialCount; serial++) {
    keyframes[serial] = [];

    for (let player = 0; player < playersCount; player++) {
      const keyframesOfPlayer = keyframesOfPlayers[player] || [];

      if (keyframesOfPlayer.length) {
        keyframes[serial][player] = keyframesOfPlayer[serial] || {
          pieceIndexes: [],
          addedPieceIndexes: [],
          removedPieceIndexes: [],
          pieceIndexRoutes: [],
          addedPieceIndexRoutes: [],
          removedPieceIndexRoutes: [],
        };
      }
    }
  }

  return keyframesOfPlayers;
};

export default createKeyframes;

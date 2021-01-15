import { NextPage } from 'next';
import React, { useState } from 'react';

import {
  BottomRightFixedButtonDenceGroup,
  ChooseGamePiecesLayout,
  Container,
  FadeInButton,
  FadeInLinkButton,
  FadeInDescription,
  Icon,
} from '../../../components';

import {
  LightBackIconUrl,
  LightVerifyIconUrl,
  GrayPlayIconUrl,
} from '../../../icons';

const ChooseGamePieces: NextPage<{ players: string; board: string }> = ({
  players,
  board,
}) => {
  const [pieces, setPieces] = useState<string[]>(
    ChooseGamePiecesLayout.defaultPiecesByPlayers[players]
  );

  const togglePiece = (piece: string) => () =>
    setPieces((pieces) =>
      pieces.includes(piece)
        ? pieces.filter((pieceForRemove) => pieceForRemove !== piece)
        : [...pieces, piece]
    );

  return (
    <Container>
      <FadeInDescription>
        <Icon url={GrayPlayIconUrl} />
        選擇玩家棋子
      </FadeInDescription>
      {ChooseGamePiecesLayout.renderButtonsByPlayers[players](
        pieces,
        togglePiece
      )}
      <BottomRightFixedButtonDenceGroup>
        <FadeInLinkButton
          href={`/game?players=${players}&board=${board}&pieces=${pieces.join(
            ','
          )}`}
          title="done"
          backgroundColor="seagreen"
          children={<Icon url={LightVerifyIconUrl} />}
        />
        <FadeInButton
          title="back"
          backgroundColor="#888"
          onClick={() => history.back()}
          children={<Icon url={LightBackIconUrl} />}
        />
      </BottomRightFixedButtonDenceGroup>
    </Container>
  );
};

ChooseGamePieces.getInitialProps = async ({ query }) => {
  let board: string | string[] | number = query.board || '';
  let players: string | string[] | number = query.players || '';

  if (Array.isArray(players)) {
    [players] = players.slice(-1);
  }

  players = players.replace(/(\D*)(2|3|4)?(.*)/g, '$2');

  if (Array.isArray(board)) {
    [board] = board.slice(-1);
  }

  return { players, board };
};

export default ChooseGamePieces;

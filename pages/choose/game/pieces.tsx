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
  GameUtil,
} from '../../../components';

import {
  LightBackIconUrl,
  LightVerifyIconUrl,
  GrayPlayIconUrl,
} from '../../../icons';

const ChooseGamePieces: NextPage<{ players: number; board: string }> = ({
  players,
  board,
}) => {
  const [pieces, setPieces] = useState<string[]>(
    ChooseGamePiecesLayout.defaultPiecesByPlayers[players] || []
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

ChooseGamePieces.getInitialProps = ({ query }) => ({
  board: GameUtil.getItem(query.board),
  players: GameUtil.getPlayersCount(query),
});

export default ChooseGamePieces;

import { NextPage } from 'next';
import React, { useState } from 'react';

import {
  BottomRightFixedButtonDenceGroup,
  ChooseGamePiecesPageLayout,
  Container,
  FadeInButton,
  FadeInLinkButton,
  FadeInDescription,
  Icon,
  GameUtil,
  InitializePageProps,
} from '../../../components';

import {
  LightBackIconUrl,
  LightVerifyIconUrl,
  GrayPlayIconUrl,
} from '../../../icons';

const ChooseGamePiecesPage: NextPage<{ players: number; board: string }> = ({
  players,
  board,
}) => {
  const [pieces, setPieces] = useState<string[]>(
    ChooseGamePiecesPageLayout.defaultPiecesByPlayers[players] || []
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
      {ChooseGamePiecesPageLayout.renderButtons(players, pieces, togglePiece)}
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

export default InitializePageProps(ChooseGamePiecesPage)((query) => ({
  board: GameUtil.getItem(query.board),
  players: GameUtil.getPlayersCount(query),
}));

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
  PagePropsInitialized,
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
  const [pieces, setPieces] = useState<string[]>([]);

  const isGameAvailable = players && board && pieces.length;

  const gameLink = `/game?players=${players}&board=${board}&pieces=${pieces}`;

  const description = pieces.length
    ? pieces.length +
      '位玩家' +
      (players - pieces.length
        ? '對' + (players - pieces.length) + '位電腦'
        : '')
    : '選擇玩家棋子';

  const handleGameLinkButtonClick = !isGameAvailable
    ? (event: React.SyntheticEvent) => event.preventDefault()
    : undefined;

  const gameLinkButtonColor = !isGameAvailable ? '#888' : 'seagreen';

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
        {description}
      </FadeInDescription>
      {ChooseGamePiecesPageLayout.renderButtons(players, pieces, togglePiece)}
      <BottomRightFixedButtonDenceGroup>
        <FadeInLinkButton
          href={gameLink}
          title="done"
          backgroundColor={gameLinkButtonColor}
          onClick={handleGameLinkButtonClick}
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

export default PagePropsInitialized(ChooseGamePiecesPage)((query) => ({
  board: GameUtil.getItem(query.board),
  players: GameUtil.getPlayersCount(query),
}));

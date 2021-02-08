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

const ChooseGamePiecesPage: NextPage<{
  playersCount: number;
  boardParams: string;
}> = ({ playersCount, boardParams }) => {
  const [pieces, setPieces] = useState<string[]>([]);

  const isGameAvailable = playersCount && boardParams && pieces.length;

  const gameLink = `/game?players=${playersCount}&board=${boardParams}&pieces=${pieces}`;

  const description = pieces.length
    ? pieces.length +
      '位玩家' +
      (playersCount - pieces.length
        ? '對' + (playersCount - pieces.length) + '位電腦'
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
      {ChooseGamePiecesPageLayout.renderButtons(
        playersCount,
        pieces,
        togglePiece
      )}
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
  boardParams: GameUtil.getItem(query.board),
  playersCount: GameUtil.getPlayersCount(query),
}));

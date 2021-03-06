import { NextPage } from 'next';
import React, { useState } from 'react';

import {
  TopLeftFixedButtonDenceGroup,
  BottomRightFixedButtonDenceGroup,
  ChooseGamePiecesPageLayout,
  Container,
  Description,
  FadeInButton,
  FadeInLinkButton,
  FadeInDescription,
  Icon,
  QueryUtil,
  PagePropsInitialized,
} from '../../../components';

import {
  LightBackIconUrl,
  LightVerifyIconUrl,
  GrayPlayIconUrl,
} from '../../../icons';

const gameLinkButtonActiveStyle = {
  transitionProperty: 'transform',
  transitionDuration: '500ms',
  transform: 'translateX(0vw)',
  opacity: 1,
};

const gameLinkButtonInactiveStyle = {
  transitionProperty: 'opacity, transform',
  transitionDuration: '500ms, 0ms',
  transitionDelay: '0ms, 500ms',
  transform: 'translateX(-100vw)',
  opacity: 0,
};

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

  const gameLinkButtonStyle = isGameAvailable
    ? gameLinkButtonActiveStyle
    : gameLinkButtonInactiveStyle;

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
        <Description.Text children={description} />
      </FadeInDescription>
      {ChooseGamePiecesPageLayout.renderButtons(
        playersCount,
        pieces,
        togglePiece
      )}

      <TopLeftFixedButtonDenceGroup>
        <FadeInButton
          title="back"
          backgroundColor="#888"
          onClick={() => history.back()}
          children={<Icon url={LightBackIconUrl} />}
        />
      </TopLeftFixedButtonDenceGroup>

      <BottomRightFixedButtonDenceGroup>
        <FadeInLinkButton
          href={gameLink}
          title="done"
          backgroundColor={gameLinkButtonColor}
          onClick={handleGameLinkButtonClick}
          children={<Icon url={LightVerifyIconUrl} />}
          style={gameLinkButtonStyle}
        />
      </BottomRightFixedButtonDenceGroup>
    </Container>
  );
};

export default PagePropsInitialized(ChooseGamePiecesPage)((query) => ({
  boardParams: QueryUtil.getItem(query.board),
  playersCount: QueryUtil.getPlayersCount(query),
}));

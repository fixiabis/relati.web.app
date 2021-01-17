import { NextPage } from 'next';
import React from 'react';

import {
  BottomRightFixedButtonDenceGroup,
  ChooseGameBoardLayout,
  GameUtil,
  Container,
  FadeInButton,
  FadeInDescription,
  Icon,
} from '../../../components';

import { LightBackIconUrl, BoardIconUrl } from '../../../icons';

const ChooseGameBoard: NextPage<{ players: number }> = ({ players }) => (
  <Container>
    <FadeInDescription>
      <Icon url={BoardIconUrl} />
      選擇棋盤大小
    </FadeInDescription>
    {ChooseGameBoardLayout.renderButtonsByPlayers[players]()}
    <BottomRightFixedButtonDenceGroup>
      <FadeInButton
        title="back"
        backgroundColor="#888"
        onClick={() => history.back()}
        children={<Icon url={LightBackIconUrl} />}
      />
    </BottomRightFixedButtonDenceGroup>
  </Container>
);

ChooseGameBoard.getInitialProps = ({ query }) => ({
  players: GameUtil.getPlayersCount(query),
});

export default ChooseGameBoard;

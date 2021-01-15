import { NextPage } from 'next';
import React from 'react';

import {
  BottomRightFixedButtonDenceGroup,
  ChooseGameBoardLayout,
  Container,
  FadeInButton,
  FadeInDescription,
  Icon,
} from '../../../components';

import { LightBackIconUrl, BoardIconUrl } from '../../../icons';

const ChooseGameBoard: NextPage<{ players: string }> = ({ players }) => (
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

ChooseGameBoard.getInitialProps = async ({ query }) => {
  let players: string | string[] = query.players || '';

  if (Array.isArray(players)) {
    [players] = players.slice(-1);
  }

  players = players.replace(/(\D*)(2|3|4)?(.*)/g, '$2');

  return { players };
};

export default ChooseGameBoard;

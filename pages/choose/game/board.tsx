import { NextPage } from 'next';
import React from 'react';

import {
  BottomRightFixedButtonDenceGroup,
  ChooseGameBoardPageLayout,
  GameUtil,
  Container,
  FadeInButton,
  FadeInDescription,
  Icon,
  InitializePageProps,
} from '../../../components';

import { LightBackIconUrl, BoardIconUrl } from '../../../icons';

const ChooseGameBoardPage: NextPage<{ players: number }> = ({ players }) => (
  <Container>
    <FadeInDescription>
      <Icon url={BoardIconUrl} />
      選擇棋盤大小
    </FadeInDescription>
    {ChooseGameBoardPageLayout.renderButtons(players)}
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

export default InitializePageProps(ChooseGameBoardPage)((query) => ({
  players: GameUtil.getPlayersCount(query),
}));

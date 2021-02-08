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
  PagePropsInitialized,
} from '../../../components';

import { LightBackIconUrl, BoardIconUrl } from '../../../icons';

const ChooseGameBoardPage: NextPage<{ playersCount: number }> = ({
  playersCount,
}) => (
  <Container>
    <FadeInDescription>
      <Icon url={BoardIconUrl} />
      選擇棋盤大小
    </FadeInDescription>
    {ChooseGameBoardPageLayout.renderButtons(playersCount)}
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

export default PagePropsInitialized(ChooseGameBoardPage)((query) => ({
  playersCount: GameUtil.getPlayersCount(query),
}));

import { NextPage } from 'next';
import React from 'react';

import {
  TopLeftFixedButtonDenceGroup,
  ChooseGameBoardPageLayout,
  QueryUtil,
  Container,
  Description,
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
      <Description.Text children="選擇棋盤大小" />
    </FadeInDescription>
    {ChooseGameBoardPageLayout.renderButtons(playersCount)}
    <TopLeftFixedButtonDenceGroup>
      <FadeInButton
        title="back"
        backgroundColor="#888"
        onClick={() => history.back()}
        children={<Icon url={LightBackIconUrl} />}
      />
    </TopLeftFixedButtonDenceGroup>
  </Container>
);

export default PagePropsInitialized(ChooseGameBoardPage)((query) => ({
  playersCount: QueryUtil.getPlayersCount(query),
}));

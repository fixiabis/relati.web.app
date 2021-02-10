import { NextPage } from 'next';
import React from 'react';

import {
  BottomRightFixedButtonDenceGroup,
  ChooseTutorialBoardPageLayout,
  GameUtil,
  Container,
  FadeInButton,
  FadeInDescription,
  Icon,
} from '../../../components';

import { LightBackIconUrl, BoardIconUrl } from '../../../icons';

const ChooseTutorialBoardPage: NextPage<{ playersCount: number }> = ({
  playersCount,
}) => (
  <Container>
    <FadeInDescription>
      <Icon url={BoardIconUrl} />
      選擇棋盤大小
    </FadeInDescription>
    {ChooseTutorialBoardPageLayout.renderButtons()}
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

export default ChooseTutorialBoardPage;

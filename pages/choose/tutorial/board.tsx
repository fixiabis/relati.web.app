import { NextPage } from 'next';
import React from 'react';

import {
  BottomLeftFixedButtonDenceGroup,
  ChooseTutorialBoardPageLayout,
  Container,
  Description,
  FadeInButton,
  FadeInDescription,
  Icon,
} from '../../../components';

import { LightBackIconUrl, BoardIconUrl } from '../../../icons';

const ChooseTutorialBoardPage: NextPage = () => (
  <Container>
    <FadeInDescription>
      <Icon url={BoardIconUrl} />
      <Description.Text children="選擇棋盤大小" />
    </FadeInDescription>
    {ChooseTutorialBoardPageLayout.renderButtons()}
    <BottomLeftFixedButtonDenceGroup>
      <FadeInButton
        title="back"
        backgroundColor="#888"
        onClick={() => history.back()}
        children={<Icon url={LightBackIconUrl} />}
      />
    </BottomLeftFixedButtonDenceGroup>
  </Container>
);

export default ChooseTutorialBoardPage;

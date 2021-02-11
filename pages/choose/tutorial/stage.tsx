import { NextPage } from 'next';
import React from 'react';

import {
  BottomLeftFixedButtonDenceGroup,
  ChooseTutorialStagePageLayout,
  Container,
  FadeInButton,
  FadeInDescription,
  Icon,
  PagePropsInitialized,
  QueryUtil,
} from '../../../components';

import { LightBackIconUrl, GrayHelpIconUrl } from '../../../icons';

const ChooseTutorialStagePage: NextPage<{ boardSize: string }> = ({
  boardSize,
}) => (
  <Container>
    <FadeInDescription>
      <Icon url={GrayHelpIconUrl} />
      選擇教學階段
    </FadeInDescription>
    {ChooseTutorialStagePageLayout.renderButtons(boardSize)}
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

export default PagePropsInitialized(ChooseTutorialStagePage)((query) => ({
  boardSize: QueryUtil.getItem(query.board),
}));

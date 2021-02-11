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

const ChooseTutorialStagePage: NextPage<{ boardParams: string }> = ({
  boardParams,
}) => (
  <Container>
    <FadeInDescription>
      <Icon url={GrayHelpIconUrl} />
      選擇教學階段
    </FadeInDescription>
    {ChooseTutorialStagePageLayout.renderButtons(boardParams)}
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
  boardParams: QueryUtil.getItem(query.board),
}));

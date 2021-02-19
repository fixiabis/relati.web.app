import { NextPage } from 'next';
import React from 'react';

import {
  TopLeftFixedButtonDenceGroup,
  ChooseTutorialStagePageLayout,
  Container,
  Description,
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
      <Description.Text children="選擇教學階段" />
    </FadeInDescription>
    {ChooseTutorialStagePageLayout.renderButtons(boardParams)}
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

export default PagePropsInitialized(ChooseTutorialStagePage)((query) => ({
  boardParams: QueryUtil.getItem(query.board),
}));

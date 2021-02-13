import { NextPage } from 'next';
import React from 'react';

import {
  BottomLeftFixedButtonDenceGroup,
  Button,
  Container,
  Description,
  FadeInButton,
  FadeInDescription,
  Icon,
  SlideLeftFadeInLinkButton,
} from '../../../components';

import { LightBackIconUrl, GrayOnePlayerIconUrl } from '../../../icons';

const ChooseGameBoardSize: NextPage = () => (
  <Container>
    <FadeInDescription>
      <Icon url={GrayOnePlayerIconUrl} />
      <Description.Text>選擇玩家數量</Description.Text>
    </FadeInDescription>
    <Button.Group>
      <SlideLeftFadeInLinkButton
        animationDelay="0.5s"
        href="/choose/game/board?players=2"
        title="2 players"
        backgroundColor="crimson"
        fontSize="30px"
        fontWeight="bold"
        children="2"
      />
      <SlideLeftFadeInLinkButton
        animationDelay="0.75s"
        href="/choose/game/board?players=3"
        title="3 players"
        backgroundColor="darkorange"
        fontSize="30px"
        fontWeight="bold"
        children="3"
      />
      <SlideLeftFadeInLinkButton
        animationDelay="1s"
        href="/choose/game/board?players=4"
        title="4 players"
        backgroundColor="royalblue"
        fontSize="30px"
        fontWeight="bold"
        children="4"
      />
    </Button.Group>
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

export default ChooseGameBoardSize;

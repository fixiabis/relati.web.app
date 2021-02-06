import { NextPage } from 'next';
import React from 'react';
import { Container, Button, Icon, HomePageLayout, LinkButton } from '../components';
import { LightHelpIconUrl, LightPlayIconUrl } from '../icons';

const Home: NextPage = () => (
  <Container>
    <HomePageLayout.SlideTopWhenLogoDrawn>
      <HomePageLayout.Logo splash />
    </HomePageLayout.SlideTopWhenLogoDrawn>
    <HomePageLayout.SlideDownFadeInWhenLogoDrawn as={Button.Group}>
      <LinkButton
        href="/choose/game/players"
        title="play"
        backgroundColor="crimson"
        children={<Icon url={LightPlayIconUrl} />}
      />
      {/* <LinkButton
        href="/choose/tutorial/board"
        title="how to play"
        backgroundColor="royalblue"
        children={<Icon url={LightHelpIconUrl} />}
      /> */}
    </HomePageLayout.SlideDownFadeInWhenLogoDrawn>
  </Container>
);

export default Home;

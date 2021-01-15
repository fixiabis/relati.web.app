import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { Container, Button, Icon, HomeLayout, LinkButton } from '../components';
import { LightHelpIconUrl, LightPlayIconUrl } from '../icons';

const Home: NextPage = () => (
  <Container>
    <HomeLayout.SlideTopWhenLogoDrawn>
      <HomeLayout.Logo splash />
    </HomeLayout.SlideTopWhenLogoDrawn>
    <HomeLayout.SlideDownFadeInWhenLogoDrawn as={Button.Group}>
      <LinkButton
        href="/choose/game/players"
        title="開始玩"
        backgroundColor="crimson"
        children={<Icon url={LightPlayIconUrl} />}
      />
      {/* <LinkButton
        href="/choose/tutorial/board"
        title="如何玩"
        backgroundColor="royalblue"
        children={<Icon url={LightHelpIconUrl} />}
      /> */}
    </HomeLayout.SlideDownFadeInWhenLogoDrawn>
  </Container>
);

export default Home;

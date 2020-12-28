import React from 'react';
import { LightPlayIconUrl, LightHelpIconUrl } from '../icons';
import { Button, Container, Icon, Link } from '../components/core';
import { HomePageStyles, Logo } from '../components/page/index';

const HomePage = () => {
  return (
    <Container>
      <Container className={HomePageStyles.SlideTopWhenLogoDrawn}>
        <Logo effect="DrawLineAndFill" />
      </Container>
      <Button.Group className={HomePageStyles.SlideDownFadeInWhenLogoDrawn}>
        <Link href="/choose-mode?for=game">
          <Button title="開始玩" color="crimson">
            <Icon url={LightPlayIconUrl} />
          </Button>
        </Link>
        <Link href="/choose-mode?for=tutorial">
          <Button title="如何玩" color="royalblue">
            <Icon url={LightHelpIconUrl} />
          </Button>
        </Link>
      </Button.Group>
    </Container>
  );
};

export default HomePage;

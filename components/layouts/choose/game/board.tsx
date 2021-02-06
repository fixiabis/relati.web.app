import { Button } from '../../../core';
import { SlideLeftFadeInLinkButton } from '../../../shared';

export const renderButtonsFor2Player = () => (
  <Button.Group>
    <SlideLeftFadeInLinkButton
      animationDelay="0.25s"
      href="/choose/game/pieces?players=2&board=x5"
      title="5"
      backgroundColor="royalblue"
      children="5"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="0.5s"
      href="/choose/game/pieces?players=2&board=x7"
      title="7"
      backgroundColor="darkorange"
      children="7"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="0.75s"
      href="/choose/game/pieces?players=2&board=x9"
      title="9"
      backgroundColor="crimson"
      children="9"
    />
    {/* <SlideLeftFadeInLinkButton
      animationDelay="1s"
      href="/choose/game/pieces?players=2&board=x11"
      title="11"
      backgroundColor="seagreen"
      children="11"
    /> */}
  </Button.Group>
);

export const renderButtonsFor3Player = () => (
  <Button.Group>
    <SlideLeftFadeInLinkButton
      animationDelay="0.25s"
      href="/choose/game/pieces?players=3&board=x7"
      title="7"
      backgroundColor="royalblue"
      children="7"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="0.5s"
      href="/choose/game/pieces?players=3&board=x9"
      title="9"
      backgroundColor="darkorange"
      children="9"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="0.75s"
      href="/choose/game/pieces?players=3&board=x11"
      title="11"
      backgroundColor="crimson"
      children="11"
    />
    {/* <SlideLeftFadeInLinkButton
      animationDelay="1s"
      href="/choose/game/pieces?players=3&board=x13"
      title="13"
      backgroundColor="seagreen"
      children="13"
    /> */}
  </Button.Group>
);

export const renderButtonsFor4Player = () => (
  <Button.Group>
    <SlideLeftFadeInLinkButton
      animationDelay="0.25s"
      href="/choose/game/pieces?players=4&board=x9"
      title="9"
      backgroundColor="royalblue"
      children="9"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="0.5s"
      href="/choose/game/pieces?players=4&board=x11"
      title="11"
      backgroundColor="darkorange"
      children="11"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="0.75s"
      href="/choose/game/pieces?players=4&board=x13"
      title="13"
      backgroundColor="crimson"
      children="13"
    />
    {/* <SlideLeftFadeInLinkButton
      animationDelay="1s"
      href="/choose/game/pieces?players=4&board=x15"
      title="15"
      backgroundColor="seagreen"
      children="15"
    /> */}
  </Button.Group>
);

export const buttonsRendererByPlayersCount = {
  2: renderButtonsFor2Player,
  3: renderButtonsFor3Player,
  4: renderButtonsFor4Player,
};

export const renderButtons = (playersCount: number) =>
  buttonsRendererByPlayersCount[playersCount]?.();

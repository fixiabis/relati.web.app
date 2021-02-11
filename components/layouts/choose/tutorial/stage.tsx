import { Button } from '../../../core';
import { FadeInLinkButton } from '../../../shared';

export const renderButtons = (boardParams: string) => (
  <Button.Group>
    <FadeInLinkButton
      href={`/tutorial?board=${boardParams}&stage=1`}
      title="1"
      backgroundColor="crimson"
      children="1"
    />
    <FadeInLinkButton
      href={`/tutorial?board=${boardParams}&stage=2`}
      title="2"
      backgroundColor="royalblue"
      children="2"
    />
    <FadeInLinkButton
      href={`/tutorial?board=${boardParams}&stage=3`}
      title="3"
      backgroundColor="darkorange"
      children="3"
    />
    <FadeInLinkButton
      href={`/tutorial?board=${boardParams}&stage=4`}
      title="4"
      backgroundColor="seagreen"
      children="4"
    />
    <FadeInLinkButton
      href={`/tutorial?board=${boardParams}&stage=5`}
      title="5"
      backgroundColor="purple"
      children="5"
    />
  </Button.Group>
);
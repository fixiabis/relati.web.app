import Link from 'next/link';
import {
  TopLeftFixed,
  BottomLeftFixed,
  BottomRightFixed,
  Button,
  Description,
} from '../core';
import { FadeIn, SlideLeftFadeIn } from './styled';

export const TopLeftFixedButtonDenceGroup = TopLeftFixed.withComponent(
  Button.DenceGroup
);

export const BottomLeftFixedButtonDenceGroup = BottomLeftFixed.withComponent(
  Button.DenceGroup
);

export const BottomRightFixedButtonDenceGroup = BottomRightFixed.withComponent(
  Button.DenceGroup
);

export const FadeInButton = FadeIn.withComponent(Button);

export const FadeInLinkButton = FadeInButton.withComponent((props) => (
  <Link href={props.href} children={<a {...props} />} />
));

export const FadeInDescription = FadeIn.withComponent(Description);

export const LinkButton = Button.withComponent((props) => (
  <Link href={props.href} children={<a {...props} />} />
));

export const SlideLeftFadeInButton = SlideLeftFadeIn.withComponent(Button);

export const SlideLeftFadeInLinkButton = SlideLeftFadeInButton.withComponent(
  (props) => <Link href={props.href} children={<a {...props} />} />
);

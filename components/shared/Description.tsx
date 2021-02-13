import styled from '@emotion/styled';
import React from 'react';
import { Icon, styles } from '../core';

const Base = styled.div({
  height: 90,
  padding: 10,
  ...styles.flexCenter,
});

const Text = styled.div({
  width: '100%',
  height: 20,
});

export type DescriptionProps = {
  iconUrl: string;
  text: string;
};

const Description: React.FC<DescriptionProps> = ({ iconUrl, text }) => (
  <Base>
    <Icon url={iconUrl} />
    <Text>{text}</Text>
  </Base>
);

export default Description;

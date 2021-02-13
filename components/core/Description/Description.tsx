import styled from '@emotion/styled';
import * as styles from '../styles';
import DescriptionText from './DescriptionText';

const DescriptionNamespace = {
  Text: DescriptionText,
};

const Description = styled.div({
  height: '90px',
  padding: '10px',
  ...styles.flexCenter,
});

export default Object.assign(Description, DescriptionNamespace);

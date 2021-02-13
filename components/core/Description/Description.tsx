import styled from '@emotion/styled';
import * as styles from '../styles';
import DescriptionText from './DescriptionText';

export type DescriptionProps = { width?: string };

const DescriptionNamespace = {
  Text: DescriptionText,
};

const Description = styled.div<DescriptionProps>(
  {
    height: '90px',
    padding: '10px',
    ...styles.flexCenter,
  },
  ({ width = 'auto' }) => ({ width })
);

export default Object.assign(Description, DescriptionNamespace);

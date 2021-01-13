import { CSSObject } from '@emotion/styled';
import { styled } from '../utils';
import ButtonDenseGroup from './ButtonDenseGroup';
import ButtonGroup from './ButtonGroup';

export type ButtonProps = Pick<
  CSSObject,
  'backgroundColor' | 'color' | 'fontSize' | 'fontWeight'
>;

const ButtonNamespace = {
  Group: ButtonGroup,
  DenceGroup: ButtonDenseGroup,
};

const Button = styled.div<ButtonProps>(
  {
    userSelect: 'none',
    color: '#f2f2f2',
    width: '50px',
    height: '50px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  {
    ':hover': {
      boxShadow: '#888 1px 1px 5px',
    },
    ':active': {
      transition: 'all 0.5s',
      transform: 'scale(0.8)',
    }
  },
  ({ backgroundColor, color, fontSize, fontWeight }) => ({
    backgroundColor,
    color,
    fontSize,
    fontWeight,
  })
);

export default Object.assign(Button, ButtonNamespace);

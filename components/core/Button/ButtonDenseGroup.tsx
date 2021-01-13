import styled from '@emotion/styled';
import { Children } from 'react';

const BUTTON_WIDTH = 60;
const BUTTON_MARGINS = 10;

const ButtonDenseGroup = styled.div(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
  },
  ({ children }) => {
    const buttonsCount = Children.count(children);

    return {
      width:
        buttonsCount * BUTTON_WIDTH +
        BUTTON_MARGINS * Math.max(1, buttonsCount - 1),
    };
  }
);

export default ButtonDenseGroup;

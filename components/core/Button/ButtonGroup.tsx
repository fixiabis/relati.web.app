import styled from '@emotion/styled';
import { Children } from 'react';

const BUTTON_WIDTH = 60;
const BUTTON_MARGINS = 55;

const ButtonGroup = styled.div(
  {
    width: '100%',
    height: '70px',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ({ children }) => {
    const buttonsCount = Children.count(children);

    return {
      width:
        buttonsCount *
        (BUTTON_WIDTH + (BUTTON_MARGINS - (buttonsCount - 1) * 15)),
    };
  }
);

export default ButtonGroup;

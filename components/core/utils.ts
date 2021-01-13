import isPropValid from '@emotion/is-prop-valid';
import styledBase, { CreateStyled, StyledOptions } from '@emotion/styled';
import React from 'react';

export const styled: CreateStyled = Object.assign(
  <C extends React.ComponentClass<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<React.ComponentProps<C>> | undefined
  ) => styledBase(component, { shouldForwardProp: isPropValid, ...options }),
  (Object.keys(styledBase) as (keyof typeof styledBase)[]).reduce(
    (styled, tag) =>
      Object.assign(styled, {
        [tag]: styledBase(tag, { shouldForwardProp: isPropValid }),
      }),
    {}
  )
) as CreateStyled;

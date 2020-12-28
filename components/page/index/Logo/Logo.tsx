import React from 'react';
import LogoStyles from './Logo.module.css';

export type LogoProps = {
  effect?: 'DrawLineAndFill' | 'DrawLineOfTrack';
};

const Logo: React.FC<LogoProps> = ({ effect }) => (
  <svg
    width="250"
    height="90"
    fill="none"
    className={LogoStyles[effect]}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="
        M  10,  30
        v  50
        h  10
        v -40
        h  20
        v -10
        z

        M  50,  30
        v  50
        h  30
        v -10
        h -20
        v -10
        h  20
        v -30
        z

        m  10,  10
        h  10
        v  10
        h -10
        z

        M 100,  20
        v  60
        h  20
        v -10
        h -10
        v -60
        h -20
        v  10
        z

        M 130,  30
        v  10
        h  20
        v  10
        h -20
        v  30
        h  30
        v -50
        z

        m  10,  30
        h  10
        v  10
        h -10
        z

        M 170,  30
        v  10
        h  10
        v  40
        h  20
        v -10
        h -10
        v -30
        h  10
        v -10
        h -10
        v -10
        h -10
        v  10
        z

        M 210,  30
        v  10
        h  10
        v  40
        h  20
        v -10
        h -10
        v -40
        z

        m  10, -20
        v  10
        h  10
        v -10
        z
      "
    />
  </svg>
);

export default Logo;

import type { Direction, Route } from '../core';

namespace BuildDirection {
  export const F: Direction = [+0, -1];
  export const B: Direction = [+0, +1];
  export const L: Direction = [-1, +0];
  export const R: Direction = [+1, +0];
  export const FL: Direction = [-1, -1];
  export const FR: Direction = [+1, -1];
  export const BL: Direction = [-1, +1];
  export const BR: Direction = [+1, +1];
}

namespace TurretBase {
  export const P0: readonly Route<Direction>[] = [];

  export const P4: readonly Route<Direction>[] = [
    [BuildDirection.F, BuildDirection.FL, BuildDirection.FR],
    [BuildDirection.B, BuildDirection.BL, BuildDirection.BR],
    [BuildDirection.L, BuildDirection.FL, BuildDirection.BL],
    [BuildDirection.R, BuildDirection.FR, BuildDirection.BR],
  ];
}

export default TurretBase;

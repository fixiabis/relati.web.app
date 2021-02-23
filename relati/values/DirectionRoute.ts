import type { Direction, Route } from '../core';

namespace PlacementDirection {
  export const C: Direction = [+0, +0];
  export const F: Direction = [+0, -1];
  export const B: Direction = [+0, +1];
  export const L: Direction = [-1, +0];
  export const R: Direction = [+1, +0];
  export const FL: Direction = [-1, -1];
  export const FR: Direction = [+1, -1];
  export const BL: Direction = [-1, +1];
  export const BR: Direction = [+1, +1];
  export const FF: Direction = [+0, -2];
  export const BB: Direction = [+0, +2];
  export const LL: Direction = [-2, +0];
  export const RR: Direction = [+2, +0];
  export const FFL: Direction = [-1, -2];
  export const FFR: Direction = [+1, -2];
  export const BBL: Direction = [-1, +2];
  export const BBR: Direction = [+1, +2];
  export const FLL: Direction = [-2, -1];
  export const FRR: Direction = [+2, -1];
  export const BLL: Direction = [-2, +1];
  export const BRR: Direction = [+2, +1];
  export const FFLL: Direction = [-2, -2];
  export const FFRR: Direction = [+2, -2];
  export const BBLL: Direction = [-2, +2];
  export const BBRR: Direction = [+2, +2];
}

namespace DirectionRoute {
  export const P8: readonly Route<Direction>[] = [
    [PlacementDirection.F, PlacementDirection.C],
    [PlacementDirection.B, PlacementDirection.C],
    [PlacementDirection.L, PlacementDirection.C],
    [PlacementDirection.R, PlacementDirection.C],

    [PlacementDirection.FL, PlacementDirection.C],
    [PlacementDirection.FR, PlacementDirection.C],
    [PlacementDirection.BL, PlacementDirection.C],
    [PlacementDirection.BR, PlacementDirection.C],
  ];

  export const P16: readonly Route<Direction>[] = [
    ...P8,

    [PlacementDirection.FF, PlacementDirection.F, PlacementDirection.C],
    [PlacementDirection.BB, PlacementDirection.B, PlacementDirection.C],
    [PlacementDirection.LL, PlacementDirection.L, PlacementDirection.C],
    [PlacementDirection.RR, PlacementDirection.R, PlacementDirection.C],

    [PlacementDirection.FFLL, PlacementDirection.FL, PlacementDirection.C],
    [PlacementDirection.FFRR, PlacementDirection.FR, PlacementDirection.C],
    [PlacementDirection.BBLL, PlacementDirection.BL, PlacementDirection.C],
    [PlacementDirection.BBRR, PlacementDirection.BR, PlacementDirection.C],
  ];

  export const P24: readonly Route<Direction>[] = [
    ...P16,

    [PlacementDirection.FFL, PlacementDirection.FF, PlacementDirection.F, PlacementDirection.C],
    [PlacementDirection.FFR, PlacementDirection.FF, PlacementDirection.F, PlacementDirection.C],
    [PlacementDirection.BBL, PlacementDirection.BB, PlacementDirection.B, PlacementDirection.C],
    [PlacementDirection.BBR, PlacementDirection.BB, PlacementDirection.B, PlacementDirection.C],

    [PlacementDirection.FLL, PlacementDirection.LL, PlacementDirection.L, PlacementDirection.C],
    [PlacementDirection.FRR, PlacementDirection.RR, PlacementDirection.R, PlacementDirection.C],
    [PlacementDirection.BLL, PlacementDirection.LL, PlacementDirection.L, PlacementDirection.C],
    [PlacementDirection.BRR, PlacementDirection.RR, PlacementDirection.R, PlacementDirection.C],

    [PlacementDirection.FFL, PlacementDirection.FL, PlacementDirection.F, PlacementDirection.C],
    [PlacementDirection.FFR, PlacementDirection.FR, PlacementDirection.F, PlacementDirection.C],
    [PlacementDirection.BBL, PlacementDirection.BL, PlacementDirection.B, PlacementDirection.C],
    [PlacementDirection.BBR, PlacementDirection.BR, PlacementDirection.B, PlacementDirection.C],

    [PlacementDirection.FLL, PlacementDirection.FL, PlacementDirection.L, PlacementDirection.C],
    [PlacementDirection.FRR, PlacementDirection.FR, PlacementDirection.R, PlacementDirection.C],
    [PlacementDirection.BLL, PlacementDirection.BL, PlacementDirection.L, PlacementDirection.C],
    [PlacementDirection.BRR, PlacementDirection.BR, PlacementDirection.R, PlacementDirection.C],

    [PlacementDirection.FLL, PlacementDirection.FL, PlacementDirection.F, PlacementDirection.C],
    [PlacementDirection.FRR, PlacementDirection.FR, PlacementDirection.F, PlacementDirection.C],
    [PlacementDirection.BLL, PlacementDirection.BL, PlacementDirection.B, PlacementDirection.C],
    [PlacementDirection.BRR, PlacementDirection.BR, PlacementDirection.B, PlacementDirection.C],

    [PlacementDirection.FFL, PlacementDirection.FL, PlacementDirection.L, PlacementDirection.C],
    [PlacementDirection.FFR, PlacementDirection.FR, PlacementDirection.R, PlacementDirection.C],
    [PlacementDirection.BBL, PlacementDirection.BL, PlacementDirection.L, PlacementDirection.C],
    [PlacementDirection.BBR, PlacementDirection.BR, PlacementDirection.R, PlacementDirection.C],
  ];
}

export default DirectionRoute;

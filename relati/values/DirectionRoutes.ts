import type { Direction, Route } from '../core';

namespace PlacementDirection {
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

namespace DirectionRoutes {
  export const P8: readonly Route<Direction>[] = [
    [PlacementDirection.F],
    [PlacementDirection.B],
    [PlacementDirection.L],
    [PlacementDirection.R],

    [PlacementDirection.FL],
    [PlacementDirection.FR],
    [PlacementDirection.BL],
    [PlacementDirection.BR],
  ];

  export const P16: readonly Route<Direction>[] = [
    ...P8,

    [PlacementDirection.FF, PlacementDirection.F],
    [PlacementDirection.BB, PlacementDirection.B],
    [PlacementDirection.LL, PlacementDirection.L],
    [PlacementDirection.RR, PlacementDirection.R],

    [PlacementDirection.FFLL, PlacementDirection.FL],
    [PlacementDirection.FFRR, PlacementDirection.FR],
    [PlacementDirection.BBLL, PlacementDirection.BL],
    [PlacementDirection.BBRR, PlacementDirection.BR],
  ];

  export const P24: readonly Route<Direction>[] = [
    ...P16,

    [PlacementDirection.FFL, PlacementDirection.FF, PlacementDirection.F],
    [PlacementDirection.FFR, PlacementDirection.FF, PlacementDirection.F],
    [PlacementDirection.BBL, PlacementDirection.BB, PlacementDirection.B],
    [PlacementDirection.BBR, PlacementDirection.BB, PlacementDirection.B],

    [PlacementDirection.FFL, PlacementDirection.FL, PlacementDirection.F],
    [PlacementDirection.FFR, PlacementDirection.FR, PlacementDirection.F],
    [PlacementDirection.BBL, PlacementDirection.BL, PlacementDirection.B],
    [PlacementDirection.BBR, PlacementDirection.BR, PlacementDirection.B],

    [PlacementDirection.FFL, PlacementDirection.FL, PlacementDirection.L],
    [PlacementDirection.FFR, PlacementDirection.FR, PlacementDirection.R],
    [PlacementDirection.BBL, PlacementDirection.BL, PlacementDirection.L],
    [PlacementDirection.BBR, PlacementDirection.BR, PlacementDirection.R],

    [PlacementDirection.FLL, PlacementDirection.FL, PlacementDirection.F],
    [PlacementDirection.FRR, PlacementDirection.FR, PlacementDirection.F],
    [PlacementDirection.BLL, PlacementDirection.BL, PlacementDirection.B],
    [PlacementDirection.BRR, PlacementDirection.BR, PlacementDirection.B],

    [PlacementDirection.FLL, PlacementDirection.FL, PlacementDirection.L],
    [PlacementDirection.FRR, PlacementDirection.FR, PlacementDirection.R],
    [PlacementDirection.BLL, PlacementDirection.BL, PlacementDirection.L],
    [PlacementDirection.BRR, PlacementDirection.BR, PlacementDirection.R],

    [PlacementDirection.FLL, PlacementDirection.LL, PlacementDirection.L],
    [PlacementDirection.FRR, PlacementDirection.RR, PlacementDirection.R],
    [PlacementDirection.BLL, PlacementDirection.LL, PlacementDirection.L],
    [PlacementDirection.BRR, PlacementDirection.RR, PlacementDirection.R],
  ];
}

export default DirectionRoutes;

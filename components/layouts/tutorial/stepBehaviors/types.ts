import { NextRouter } from 'next/router';
import { Game, PieceIndex } from '../../../../relati';
import { BoardForGameProps, PieceProps, RouteProps } from '../../../game';
import { TutorialBottomNoticeProps } from '../TutorialBottomNotice';
import { TutorialOverDialogProps } from '../TutorialOverDialog';

export type StepBehavior = {
  boardAdditions?: {
    propsOfRoutes?: Partial<RouteProps>[];
    propsOfPieces?: Partial<PieceProps>[];
  };

  getBoardProps?: (
    next: (step?: number) => void,
    game: Game<number, number>,
    place: (pieceIndex: PieceIndex) => void,
    undoGame: (step?: number) => void
  ) => Partial<BoardForGameProps>;

  getNoticeProps?: (
    next: (step?: number) => void,
    game: Game<number, number>,
    place: (pieceIndex: PieceIndex) => void,
    undoGame: (step?: number) => void
  ) => TutorialBottomNoticeProps;

  getOverDialogProps?: (router: NextRouter) => Partial<TutorialOverDialogProps>;

  execute?: (
    next: (step?: number) => void,
    game: Game<number, number>,
    place: (pieceIndex: PieceIndex) => void,
    undoGame: (step?: number) => void
  ) => void;

  initRecord?: () => {
    pieceIndex: number;
    game: Game<number, number>;
  };
};

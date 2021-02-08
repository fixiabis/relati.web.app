import { useMemo } from 'react';
import { GameDefinition } from '../../../relati';
import Thinker, {
  DeepThinking,
  ExplainableThinking,
} from '../../../relati/Thinker';
import { Player, Piece } from './types';

const useGameDeepThinker = (
  definition: GameDefinition<Player, Piece>,
  Thinking: (
    definition: GameDefinition<Player, Piece>
  ) => ExplainableThinking<Player, Piece>,
  depth: number = 1
) =>
  useMemo(() => {
    const baseThinking = Thinking(definition);
    const deepThinking = DeepThinking(baseThinking, depth);
    const thinker = Thinker(deepThinking);
    return thinker;
  }, [definition, Thinking]);

export default useGameDeepThinker;

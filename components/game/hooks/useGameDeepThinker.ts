import { useMemo } from 'react';
import { GameDefinition } from '../../../relati';
import Thinker, { DeepThinking, Thinking } from '../../../relati/Thinker';
import { Player, Piece } from './types';

const useGameDeepThinker = (
  definition: GameDefinition<Player, Piece>,
  Thinking: (
    definition: GameDefinition<Player, Piece>
  ) => Thinking<Player, Piece>,
  depth: number = 1
) =>
  useMemo(() => {
    const baseThinking = Thinking(definition);
    const deepThinking = DeepThinking(baseThinking, depth);
    const thinker = Thinker(deepThinking);
    return thinker;
  }, [definition, Thinking, depth]);

export default useGameDeepThinker;

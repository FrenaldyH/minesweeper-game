import Cell from './Cell';
import type { GameState } from '../../types';
import { DIFFICULTIES } from '../../utils/helpers';

interface BoardProps {
  state: GameState;
  onCellClick: (r: number, c: number) => void;
  onCellRightClick: (r: number, c: number) => void;
}

const Board = ({ state, onCellClick, onCellRightClick }: BoardProps) => {
  const { size, grid, revealed, flagged, lastHit, diff } = state;
  const cls = DIFFICULTIES[diff].cls;

  return (
    <div className={`board ${cls}`} style={{ gridTemplateColumns: `repeat(${size}, auto)` }}>
      {Array.from({ length: size }).map((_, r) =>
        Array.from({ length: size }).map((_, c) => (
          <Cell
            key={`${r}-${c}`}
            data={{
              r,
              c,
              value: grid[r][c],
              revealed: revealed[r][c],
              flagged: flagged[r][c],
              exploded: lastHit?.r === r && lastHit?.c === c,
            }}
            onClick={onCellClick}
            onRightClick={onCellRightClick}
          />
        ))
      )}
    </div>
  );
};

export default Board;

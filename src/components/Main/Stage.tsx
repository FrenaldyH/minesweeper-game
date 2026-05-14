import Board from '../Board/Board';
import Overlay from './Overlay';
import type { GameState } from '../../types';
import { countRevealedSafe } from '../../utils/gameLogic';

interface Props {
  state: GameState;
  flagCount: number;
  elapsed: number;
  onCellClick: (r: number, c: number) => void;
  onCellRightClick: (r: number, c: number) => void;
  onPlayAgain: () => void;
}

const Stage = ({
  state,
  flagCount,
  elapsed,
  onCellClick,
  onCellRightClick,
  onPlayAgain,
}: Props) => {
  const safeTotal = state.size * state.size - state.mineCount;
  const revealedSafe = countRevealedSafe(state.revealed, state.grid, state.size);
  const progress = (revealedSafe / safeTotal) * 100;

  // Capitalize helper
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // Status text & class
  let statusText = 'Awaiting first move';
  let statusClass = '';
  if (state.status === 'playing') statusText = 'In progress';
  if (state.status === 'won') statusText = 'Cleared';
  if (state.status === 'lost') {
    statusText = 'Game over';
    statusClass = 'lose';
  }

  return (
    <section className="stage">
      {/* Header */}
      <div className="stage-head">
        <div className="stage-head-left">
          <h2>Sweep the field</h2>
          <span className="sub">
            Mode <b>{capitalize(state.diff)}</b> ·{' '}
            <b>
              {state.size}x{state.size}
            </b>
          </span>
        </div>
        <div className={`status-chip ${statusClass}`}>
          <span className="led" />
          <span>{statusText}</span>
        </div>
      </div>

      {/* Body */}
      <div className="stage-body">
        <div className="progress-row">
          <span className="name">Progress</span>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${Math.min(100, progress)}%` }} />
          </div>
          <span className="progress-num">
            <b>{revealedSafe}</b>
            <span> / {safeTotal}</span>
          </span>
        </div>

        <div className="board-wrap">
          <Board state={state} onCellClick={onCellClick} onCellRightClick={onCellRightClick} />
        </div>
      </div>

      {/* Footer */}
      <div className="stage-foot">
        <span>Safe · Zone</span>
        <div className="right">
          <span className="pair">
            Seed<b>{state.seed}</b>
          </span>
          <span className="pair">
            Mode<b>{state.diff.toUpperCase()}</b>
          </span>
          <span className="pair">
            Flags<b>{flagCount}</b>
          </span>
        </div>
      </div>

      {/* Overlay (win/lose modal) */}
      <Overlay
        status={state.status}
        elapsed={elapsed}
        diff={state.diff}
        flagCount={flagCount}
        onPlayAgain={onPlayAgain}
      />
    </section>
  );
};

export default Stage;

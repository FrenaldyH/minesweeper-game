import { formatTime } from '../../utils/helpers';
import type { GameStatus, Difficulty } from '../../types';

interface Props {
  status: GameStatus;
  elapsed: number;
  diff: Difficulty;
  flagCount: number;
  onPlayAgain: () => void;
}

const Overlay = ({ status, elapsed, diff, flagCount, onPlayAgain }: Props) => {
  const show = status === 'won' || status === 'lost';
  const won = status === 'won';

  return (
    <div className={`overlay ${show ? 'show' : ''}`}>
      <div className="overlay-card">
        <div className={`badge ${won ? '' : 'lose'}`}>{won ? 'CLEARED' : 'GAME OVER'}</div>
        <div className="ttl">{won ? 'Field swept clean.' : 'You hit a mine.'}</div>
        <div className="stats">
          <div className="col">
            <div className="lab">Time</div>
            <div className="val mono">{formatTime(elapsed)}</div>
          </div>
          <div className="col">
            <div className="lab">Difficulty</div>
            <div className="val mono">{diff.toUpperCase()}</div>
          </div>
          <div className="col">
            <div className="lab">Flags</div>
            <div className="val mono">{flagCount}</div>
          </div>
        </div>
        <div className="actions">
          <button className="pill green" onClick={onPlayAgain}>
            Play again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;

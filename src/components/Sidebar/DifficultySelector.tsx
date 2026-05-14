import type { Difficulty } from '../../types';
import { DIFFICULTIES } from '../../utils/helpers';
import { EasyIcon, MediumIcon, HardIcon } from '../Icons';

interface Props {
  current: Difficulty;
  onChange: (diff: Difficulty) => void;
}

const DifficultySelector = ({ current, onChange }: Props) => {
  // Map icon untuk setiap difficulty
  const icons = {
    easy: <EasyIcon />,
    medium: <MediumIcon />,
    hard: <HardIcon />,
  };

  // Capitalize untuk badge ("easy" → "Easy")
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="card">
      <div className="card-title">
        Difficulty
        <span className="badge">{capitalize(current)}</span>
      </div>
      <div className="difficulty">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => {
          const cfg = DIFFICULTIES[diff];
          return (
            <button
              key={diff}
              className={`diff-btn ${current === diff ? 'active' : ''}`}
              onClick={() => onChange(diff)}
            >
              <span className="left">
                <span className="knob">{icons[diff]}</span>
                <span className="lbl">{capitalize(diff)}</span>
              </span>
              <span className="meta">
                {cfg.size}x{cfg.size} · {cfg.mines}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySelector;

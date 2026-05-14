import DifficultySelector from './DifficultySelector';
import Scoreboard from './Scoreboard';
import SoundToggle from './SoundToggle';
import RestartButton from './RestartButton';
import HowToPlay from './HowToPlay';
import type { Difficulty } from '../../types';

interface Props {
  difficulty: Difficulty;
  elapsed: number;
  minesLeft: number;
  soundOn: boolean;
  onDifficultyChange: (d: Difficulty) => void;
  onToggleSound: () => void;
  onRestart: () => void;
}

const Sidebar = ({
  difficulty,
  elapsed,
  minesLeft,
  soundOn,
  onDifficultyChange,
  onToggleSound,
  onRestart,
}: Props) => (
  <aside className="sidebar">
    <DifficultySelector current={difficulty} onChange={onDifficultyChange} />
    <Scoreboard elapsed={elapsed} minesLeft={minesLeft} />
    <SoundToggle on={soundOn} onToggle={onToggleSound} />
    <RestartButton onClick={onRestart} />
    <HowToPlay />
  </aside>
);

export default Sidebar;

import Topbar from './Topbar';
import Stage from './Stage';
import type { GameState, Theme } from '../../types';

interface Props {
  state: GameState;
  flagCount: number;
  elapsed: number;
  theme: Theme;
  onCellClick: (r: number, c: number) => void;
  onCellRightClick: (r: number, c: number) => void;
  onPlayAgain: () => void;
  onToggleTheme: () => void;
  onHome: () => void;
}

const Main = ({
  state,
  flagCount,
  elapsed,
  theme,
  onCellClick,
  onCellRightClick,
  onPlayAgain,
  onToggleTheme,
  onHome,
}: Props) => (
  <main className="col-main">
    <Topbar difficulty={state.diff} theme={theme} onToggleTheme={onToggleTheme} onHome={onHome} />
    <Stage
      state={state}
      flagCount={flagCount}
      elapsed={elapsed}
      onCellClick={onCellClick}
      onCellRightClick={onCellRightClick}
      onPlayAgain={onPlayAgain}
    />
  </main>
);

export default Main;

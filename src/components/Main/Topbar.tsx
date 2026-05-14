import { BrandIcon, HomeIcon, ThemeIcon } from '../Icons';
import type { Difficulty, Theme } from '../../types';

interface Props {
  difficulty: Difficulty;
  theme: Theme;
  onToggleTheme: () => void;
  onHome: () => void;
}

const Topbar = ({ difficulty, theme, onToggleTheme, onHome }: Props) => {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">
          <BrandIcon />
        </div>
        <div className="brand-text">
          Minesweeper<span className="dot">.</span>
        </div>
        <div className="crumb">
          Play <b>· {capitalize(difficulty)}</b>
        </div>
      </div>

      <div className="top-actions">
        <button className="pill ghost" onClick={onHome}>
          <HomeIcon />
          Home
        </button>
        <button className="pill" onClick={onToggleTheme}>
          <ThemeIcon />
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  );
};

export default Topbar;

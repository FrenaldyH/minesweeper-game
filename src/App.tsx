import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import Home from './components/Home/Home';
import { useGame } from './hooks/useGame';
import { useTimer } from './hooks/useTimer';
import { useTheme } from './hooks/useTheme';
import { countFlags } from './utils/gameLogic';
import type { Difficulty } from './types';

import './styles/sidebar.css';
import './styles/main.css';
import './styles/board.css';
import './styles/overlay.css';

function App() {
  const [screen, setScreen] = useState<'home' | 'game'>('home');
  const [soundOn, setSoundOn] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const timer = useTimer();

  const { state, startNewGame, revealCell, toggleFlag } = useGame('easy', soundOn, () =>
    timer.start()
  );

  useEffect(() => {
    if (state.status === 'won' || state.status === 'lost') {
      timer.stop();
    }
  }, [state.status]);

  const flagCount = countFlags(state.flagged, state.size);
  const minesLeft = Math.max(0, state.mineCount - flagCount);

  const handleRestart = useCallback(() => {
    timer.reset();
    startNewGame();
  }, [timer, startNewGame]);

  const handleDifficultyChange = useCallback(
    (diff: Difficulty) => {
      timer.reset();
      startNewGame(diff);
    },
    [timer, startNewGame]
  );

  const handlePlay = useCallback(
    (diff: Difficulty) => {
      timer.reset();
      startNewGame(diff);
      setScreen('game');
    },
    [timer, startNewGame]
  );

  const handleHome = useCallback(() => {
    timer.reset();
    setScreen('home');
  }, [timer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen !== 'game') return;
      if (e.key === 'r' || e.key === 'R') handleRestart();
      if (e.key === 'm' || e.key === 'M') setSoundOn((s) => !s);
      if (e.key === 't' || e.key === 'T') toggleTheme();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [screen, handleRestart, toggleTheme]);

  if (screen === 'home') {
    return <Home onPlay={handlePlay} />;
  }

  return (
    <div className="shell" onContextMenu={(e) => e.preventDefault()}>
      <Sidebar
        difficulty={state.diff}
        elapsed={timer.elapsed}
        minesLeft={minesLeft}
        soundOn={soundOn}
        onDifficultyChange={handleDifficultyChange}
        onToggleSound={() => setSoundOn((s) => !s)}
        onRestart={handleRestart}
      />
      <Main
        state={state}
        flagCount={flagCount}
        elapsed={timer.elapsed}
        theme={theme}
        onCellClick={revealCell}
        onCellRightClick={toggleFlag}
        onPlayAgain={handleRestart}
        onToggleTheme={toggleTheme}
        onHome={handleHome}
      />
    </div>
  );
}

export default App;

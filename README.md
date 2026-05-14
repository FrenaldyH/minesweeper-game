# Minesweeper.

Classic Minesweeper with a Spotify-inspired dark/light UI, built with React + TypeScript.

**Live demo:** https://minesweeper-game-woad.vercel.app

---

## Features

- Three difficulty levels — Easy (8×8), Medium (14×14), Hard (20×20)
- Dark / Light mode with persistence via localStorage
- Sound effects on reveal, flag, win, and lose
- Progress bar, timer, mine counter, and seed display
- Flood-fill reveal on empty cells (standard Minesweeper behavior)
- Keyboard shortcuts: `R` restart · `M` mute · `T` toggle theme
- Home screen with developer profile and social links

## Tech Stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Bundler | Vite |
| Styling | Plain CSS with CSS custom properties |
| Package manager | pnpm |
| Deploy | Vercel |

## Getting Started

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

## Project Structure

```
src/
├── components/
│   ├── Board/          # Board grid and Cell
│   ├── Home/           # Home / landing screen
│   ├── Main/           # Topbar, Stage, Overlay
│   ├── Sidebar/        # Difficulty, Scoreboard, Sound, Restart, HowToPlay
│   └── Icons.tsx       # All SVG icons
├── hooks/
│   ├── useGame.ts      # Core game state and logic
│   ├── useTimer.ts     # Stopwatch
│   └── useTheme.ts     # Dark/light mode toggle
├── utils/
│   ├── gameLogic.ts    # Mine placement, flood-fill, win check
│   ├── helpers.ts      # Difficulty config, formatters
│   └── sound.ts        # Sound effects
├── styles/
│   ├── variabel.css    # CSS custom properties (dark + light)
│   ├── global.css      # Base styles, layout, home screen
│   ├── main.css        # Topbar and pill buttons
│   ├── sidebar.css     # Sidebar cards and controls
│   ├── board.css       # Board, cells, status chip
│   └── overlay.css     # Win/lose modal
└── types/index.ts      # Shared TypeScript types
```

## Author

**Frenaldy Bestabba Hasugian**

[![GitHub](https://img.shields.io/badge/GitHub-FrenaldyH-181717?logo=github)](https://github.com/FrenaldyH)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-frenaldyh-0A66C2?logo=linkedin)](https://www.linkedin.com/in/frenaldyh)
[![Instagram](https://img.shields.io/badge/Instagram-frenaldyhasugian-E4405F?logo=instagram)](https://instagram.com/frenaldyhasugian)

import { BrandIcon, GitHubIcon, LinkedInIcon, InstagramIcon } from '../Icons';
import type { Difficulty } from '../../types';

interface Props {
  onPlay: (diff: Difficulty) => void;
}

const MODES: { diff: Difficulty; label: string; meta: string }[] = [
  { diff: 'easy', label: 'Easy', meta: '8×8 · 10 mines' },
  { diff: 'medium', label: 'Medium', meta: '14×14 · 30 mines' },
  { diff: 'hard', label: 'Hard', meta: '20×20 · 70 mines' },
];

const SOCIALS = [
  {
    label: 'GitHub',
    handle: '@FrenaldyH',
    href: 'https://github.com/FrenaldyH',
    icon: <GitHubIcon />,
  },
  {
    label: 'LinkedIn',
    handle: 'frenaldyh',
    href: 'https://www.linkedin.com/in/frenaldyh',
    icon: <LinkedInIcon />,
  },
  {
    label: 'Instagram',
    handle: '@frenaldyhasugian',
    href: 'https://instagram.com/frenaldyhasugian',
    icon: <InstagramIcon />,
  },
];

const Home = ({ onPlay }: Props) => (
  <div className="home-shell">
    <div className="home-card">
      <div className="home-brand">
        <div className="brand-mark">
          <BrandIcon />
        </div>
        <div className="brand-text">
          Minesweeper<span className="dot">.</span>
        </div>
      </div>

      <p className="home-sub">Classic mine-sweeping, Spotify-style.</p>

      <div className="home-modes">
        {MODES.map(({ diff, label, meta }) => (
          <button key={diff} className="home-mode-btn" onClick={() => onPlay(diff)}>
            <span className="home-mode-lbl">{label}</span>
            <span className="home-mode-meta">{meta}</span>
          </button>
        ))}
      </div>

      <button className="restart-pill home-play-btn" onClick={() => onPlay('easy')}>
        Play Now
      </button>
    </div>

    {/* Profile section */}
    <div className="home-profile">
      <div className="home-profile-header">
        <div className="home-avatar">F</div>
        <div>
          <div className="home-profile-name">Frenaldy Bestabba Hasugian</div>
          <div className="home-profile-role">Developer</div>
        </div>
      </div>

      <div className="home-socials">
        {SOCIALS.map(({ label, handle, href, icon }) => (
          <a
            key={label}
            className="home-social-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="home-social-icon">{icon}</span>
            <span className="home-social-text">
              <span className="home-social-label">{label}</span>
              <span className="home-social-handle">{handle}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default Home;

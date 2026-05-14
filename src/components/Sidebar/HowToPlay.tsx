import { LClickIcon, FlagIcon, NumberIcon, RestartIcon } from '../Icons';

const HowToPlay = () => (
  <div className="card">
    <div className="card-title">How to play</div>
    <div className="how-list">
      <div className="how-item">
        <div className="ic">
          <LClickIcon />
        </div>
        <div className="txt">
          <b>Left click</b>Reveal a tile
        </div>
        <span className="key">L</span>
      </div>
      <div className="how-item">
        <div className="ic">
          <FlagIcon />
        </div>
        <div className="txt">
          <b>Right click</b>Place a flag
        </div>
        <span className="key">R</span>
      </div>
      <div className="how-item">
        <div className="ic">
          <NumberIcon />
        </div>
        <div className="txt">
          <b>Numbers</b>Adjacent mines (1-8)
        </div>
        <span className="key">1-8</span>
      </div>
      <div className="how-item">
        <div className="ic">
          <RestartIcon />
        </div>
        <div className="txt">
          <b>Restart</b>Reset the board
        </div>
        <span className="key">R</span>
      </div>
    </div>
  </div>
);

export default HowToPlay;

import { formatTime } from '../../utils/helpers';

interface Props {
  elapsed: number;
  minesLeft: number;
}

const Scoreboard = ({ elapsed, minesLeft }: Props) => (
  <div className="card">
    <div className="card-title">Status</div>
    <div className="scoreboard">
      <div className="col">
        <div className="lab">Time</div>
        <div className="val mono">{formatTime(elapsed)}</div>
      </div>
      <div className="col">
        <div className="lab">Mines</div>
        <div className="val mono accent">{minesLeft}</div>
      </div>
    </div>
  </div>
);

export default Scoreboard;

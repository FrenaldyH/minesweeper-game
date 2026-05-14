import { RestartIcon } from '../Icons';

interface Props {
  onClick: () => void;
}

const RestartButton = ({ onClick }: Props) => (
  <button className="restart-pill" onClick={onClick}>
    <RestartIcon />
    Restart
  </button>
);

export default RestartButton;

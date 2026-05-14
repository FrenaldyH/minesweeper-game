import { SoundIcon } from '../Icons';

interface Props {
  on: boolean;
  onToggle: () => void;
}

const SoundToggle = ({ on, onToggle }: Props) => (
  <div className="card">
    <div className="row">
      <div className="label">
        <SoundIcon />
        Sound effects
      </div>
      <button className={`switch ${on ? 'on' : ''}`} onClick={onToggle} aria-pressed={on} />
    </div>
  </div>
);

export default SoundToggle;

import { memo } from 'react';
import { MineIcon, FlagIcon } from '../Icons';
import type { CellData } from '../../types';

interface CellProps {
  data: CellData;
  onClick: (r: number, c: number) => void;
  onRightClick: (r: number, c: number) => void;
}

const Cell = memo(({ data, onClick, onRightClick }: CellProps) => {
  const { r, c, value, revealed, flagged, exploded } = data;

  const handleClick = () => onClick(r, c);
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onRightClick(r, c);
  };

  // Build class names
  const classes = ['cell'];

  if (flagged && !revealed) {
    classes.push('flag');
  } else if (revealed) {
    classes.push('revealed');
    if (value === -1) {
      classes.push('mine');
      if (exploded) classes.push('exploded');
    } else if (value === 0) {
      classes.push('empty');
    } else {
      classes.push(`n-${value}`);
    }
  }

  // Build content
  let content: React.ReactNode = null;
  if (flagged && !revealed) {
    content = <FlagIcon />;
  } else if (revealed) {
    if (value === -1) {
      content = <MineIcon />;
    } else if (value > 0) {
      content = value;
    }
  }

  return (
    <button
      className={classes.join(' ')}
      data-r={r}
      data-c={c}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {content}
    </button>
  );
});

Cell.displayName = 'Cell';

export default Cell;

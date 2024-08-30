import { CellBase, CellProps } from './Cell';
import { CellButton, CellButtonProps } from './Cell.Button';

export const Cell = Object.assign(CellBase, {
    Button: CellButton,
});

export type { CellProps, CellButtonProps };

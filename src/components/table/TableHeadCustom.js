import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, TableHead } from '@mui/material';

// ----------------------------------------------------------------------

TableHeadCustom.propTypes = {
  headLabel: PropTypes.array,
  sx: PropTypes.object,
};

export default function TableHeadCustom({
  headLabel,
  sx,
}) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

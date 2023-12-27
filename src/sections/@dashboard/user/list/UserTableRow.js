import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import {email} from "../../../../_mock/email";

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onSelectRow, onDeleteRow }) {

  const { fullName, roleName, email, avatarUrl, userStatusName } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={fullName} src={avatarUrl} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {fullName}
        </Typography>
      </TableCell>

      <TableCell align="left">{roleName}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {email}
      </TableCell>

      <TableCell align="center">
        <Iconify
          icon={userStatusName === 'Đã kích hoạt' ? 'eva:checkmark-circle-fill' : 'solar:forbidden-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!(userStatusName === 'Đã kích hoạt') && { color: 'error.main' }),
          }}
        />
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}

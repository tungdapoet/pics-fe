import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { TableRow, Checkbox, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
//

// ----------------------------------------------------------------------

PinTableRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onEditRow: PropTypes.func,
    onSelectRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
};

export default function PinTableRow({ row, selected, onSelectRow, onDeleteRow }) {

    const { name, cover } = row;

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
                <Image disabledEffect alt={name} src={cover} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
                <Typography variant="subtitle2" noWrap>
                    {name}
                </Typography>
            </TableCell>

            <TableCell align="left">{name}</TableCell>

            <TableCell>{name}</TableCell>

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
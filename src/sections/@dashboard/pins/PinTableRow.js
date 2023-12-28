import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
//

// ----------------------------------------------------------------------

PinTableRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onDeleteRow: PropTypes.func,
};

export default function PinTableRow({ row, selected, onDeleteRow }) {

    const { title, description, dataResponseUser, imageUrl } = row;

    const [openMenu, setOpenMenuActions] = useState(null);

    const handleOpenMenu = (event) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };

    return (
        <TableRow hover selected={selected}>

            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Image disabledEffect alt={title} src={imageUrl} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
                <Typography variant="subtitle2" noWrap>
                    {title}
                </Typography>
            </TableCell>

            <TableCell align="left">{description}</TableCell>

            <TableCell>{dataResponseUser.fullName}</TableCell>

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
//-----------------------------------------------------
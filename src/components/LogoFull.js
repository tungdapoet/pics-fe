import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
import Image from "./Image";

// ----------------------------------------------------------------------

LogoFull.propTypes = {
    disabledLink: PropTypes.bool,
    sx: PropTypes.object,
};

export default function LogoFull({ disabledLink = false, sx }) {
    const logo = (
        <Box sx={{ width: 180, height: 180, ...sx }}>
            <Image
                disabledEffect
                src={'/logo/logo_full.svg'}
            />
        </Box>
    );

    if (disabledLink) {
        return <>{logo}</>;
    }

    return <RouterLink to="/">{logo}</RouterLink>;
}
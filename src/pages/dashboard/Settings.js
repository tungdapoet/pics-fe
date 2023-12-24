import PropTypes from 'prop-types';
import {AnimatePresence, m} from 'framer-motion';
import {useState, useEffect} from 'react';
// @mui
import {alpha, styled} from '@mui/material/styles';
import {Backdrop, Divider, Typography, Stack, FormControlLabel, Radio, Grid} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';

import Iconify from '../../components/Iconify';
import {IconButtonAnimate} from '../../components/animate';
//
import SettingMode from '../../components/settings/SettingMode';
import SettingLayout from '../../components/settings/SettingLayout';
import SettingStretch from '../../components/settings/SettingStretch';
import SettingDirection from '../../components/settings/SettingDirection';
import SettingColorPresets from '../../components/settings/SettingColorPresets';

// ----------------------------------------------------------------------

export default function Settings() {
    const {onResetSetting} = useSettings();


    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{py: 2, pr: 1, pl: 2.5}}>
                <Typography variant="subtitle1">Settings</Typography>
                <div>
                    <IconButtonAnimate onClick={onResetSetting}>
                        <Iconify icon={'ic:round-refresh'} width={20} height={20}/>
                    </IconButtonAnimate>
                </div>
            </Stack>

            <Divider sx={{borderStyle: 'dashed'}}/>

            <Grid container spacing={5} sx={{p: 3}}>
                <Grid item xs={6} spacing={1.5}>
                    <Typography variant="subtitle2">Mode</Typography>
                    <SettingMode/>
                </Grid>

                <Grid item xs={6} spacing={1.5}>
                    <Typography variant="subtitle2">Direction</Typography>
                    <SettingDirection/>
                </Grid>

                <Grid item xs={6} spacing={1.5}>
                    <Typography variant="subtitle2">Layout</Typography>
                    <SettingLayout/>
                </Grid>

                <Grid item xs={6} spacing={1.5}>
                    <Typography variant="subtitle2">Presets</Typography>
                    <SettingColorPresets/>
                </Grid>

                <Grid item xs={6} spacing={1.5}>
                    <Typography variant="subtitle2">Stretch</Typography>
                    <SettingStretch/>
                </Grid>

            </Grid>

        </>
    );
}

// ----------------------------------------------------------------------

BoxMask.propTypes = {
    value: PropTypes.string,
};

export function BoxMask({value}) {
    return (
        <FormControlLabel
            label=""
            value={value}
            control={<Radio sx={{display: 'none'}}/>}
            sx={{
                m: 0,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                position: 'absolute',
            }}
        />
    );
}

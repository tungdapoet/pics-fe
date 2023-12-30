import * as Yup from 'yup';
import PropTypes from "prop-types";
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import {useNavigate, useParams} from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {Grid, Card, Stack, Button, Typography} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {FormProvider, RHFCheckbox} from '../../../components/hook-form';
import Scrollbar from "../../../components/Scrollbar";
import {createReportUser} from "../../../api/report";

// ----------------------------------------------------------------------

UserReportForm.propTypes = {
    id: PropTypes.number,
    onClose: PropTypes.func,
    callback: PropTypes.func
};

export default function UserReportForm({id, onClose, callback}){
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const UserReportSchema = Yup.object().shape({
        isSpam: Yup.boolean(),
        isSexualized: Yup.boolean(),
        isSelfHarm: Yup.boolean(),
        isDangerous: Yup.boolean(),
        isHarassment: Yup.boolean(),
        isPrivacy: Yup.boolean(),
        isIntellectual: Yup.boolean(),
    }).test(
        'at-least-one-true',
        'You must report at least one issue',
        (value) => Object.values(value).some(Boolean) // Checks if at least one value is true
    );

    const defaultValues = {
        isSpam: false,
        isSexualized: false,
        isSelfHarm: false,
        isDangerous: false,
        isHarassment: false,
        isPrivacy: false,
        isIntellectual: false,
    };

    const methods = useForm({
        resolver: yupResolver(UserReportSchema),
        defaultValues,
    });

    const {
        getValues,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    function getReportReasons(values) {
        const trueValues = Object.entries(values)
            .filter(([key, value]) => value)
            .map(([key]) => key)
            .map((key) => key.replace(/^is/, ''))
            .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
            .join(', ');

        return trueValues;
    }

    const onSubmit = async () => {
        const form = getValues();
        createReportUser({userReportedId: id, reason: getReportReasons(form)}).then(() => {
            enqueueSnackbar('Report successful!');
            navigate(PATH_DASHBOARD.root, {replace: true});
        }).catch((err) => {
            enqueueSnackbar(`Unable to report: ${err}`, { variant: 'error' });
        })
    }

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Scrollbar>
                    <Card sx={{ p: 3 }}>
                        <Grid container spacing={1} sx={{pt: 2}}>
                            <Grid item xs={12}>
                                <Typography variant="h5">REPORT USER</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFCheckbox name="isSpam"
                                             label={<Typography variant="h6">Spam</Typography>}
                                />
                                <Typography variant="body2" sx={{ml: 4}}>Misleading or Repetitive</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFCheckbox name="isSexualized"
                                             label={<Typography variant="h6">Sexualized Content</Typography>}
                                />
                                <Typography variant="body2" sx={{ml: 4}}>Sexualized explicit content involving adults or nudity, non-nudity or intentional missuse involving minors</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFCheckbox name="isSelfHarm"
                                             label={<Typography variant="h6">Self-Harm</Typography>}
                                />
                                <Typography variant="body2" sx={{ml: 4}}>Self-harm or Suicide</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFCheckbox name="isDangerous"
                                             label={<Typography variant="h6">Dangerous Content</Typography>}
                                />
                                <Typography variant="body2" sx={{ml: 4}}>Drugs, Weapons, Regulated Products</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFCheckbox name="isHarassment"
                                             label={<Typography variant="h6">Harrasment or Criticism</Typography>}
                                />
                                <Typography variant="body2" sx={{ml: 4}}>Insults, Threats, non-consensual content</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFCheckbox name="isPrivacy"
                                             label={<Typography variant="h6">Privacy Violation</Typography>}
                                />
                                <Typography variant="body2" sx={{ml: 4}}>Personal Information included</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFCheckbox name="isIntellectual"
                                             label={<Typography variant="h6">Intellectual Property</Typography>}
                                />
                                <Typography variant="body2" sx={{ml: 4}}>Copyright or Trademark infringement</Typography>
                            </Grid>
                        </Grid>
                        <Stack spacing={3}>
                            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                                <Button fullWidth onClick={onClose} color="inherit" variant="outlined" size="large" >
                                    Cancel
                                </Button>
                                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                                    Submit
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </Card>
                </Scrollbar>

            </FormProvider>
        </>
    );
}

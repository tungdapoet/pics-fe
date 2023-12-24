import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate} from 'react-router-dom';
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
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

PinReportForm.propTypes = {
    id: PropTypes.number,
    onClose: PropTypes.func,
    callback: PropTypes.func
};

export default function PinReportForm({id, onClose, callback}){
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();



    const NewBlogSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        content: Yup.string().min(1000).required('Content is required'),
        cover: Yup.mixed().required('Cover is required'),
    });

    const defaultValues = {
        title: '',
        description: '',
        content: '',
        cover: null,
        tags: ['Logan'],
        publish: true,
        comments: true,
        metaTitle: '',
        metaDescription: '',
        metaKeywords: ['Logan'],
    };

    const methods = useForm({
        resolver: yupResolver(NewBlogSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const values = watch();


    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{ p: 3 }}>
                    <Grid container spacing={1} sx={{pt: 2}}>
                        <Grid item xs={12}>
                            <Typography sx={{fontWeight: 600, fontSize: 20}}>REPORT PIN</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFCheckbox sx={{fontWeight: 600, fontSize: 20}} name="isSpam" label="Spam"/>
                            <Typography>Misleading or Repetitive</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFCheckbox sx={{fontWeight: 600, fontSize: 20}} name="isSexualized" label="Sexualized Content"/>
                            <Typography>Sexualized explicit content involving adults or nudity, non-nudity or intentional missuse involving minors</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFCheckbox sx={{fontWeight: 600, fontSize: 20}} name="isSelfHarm" label="Self-Harm"/>
                            <Typography>Self-harm or Suicide</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFCheckbox sx={{fontWeight: 600, fontSize: 20}} name="isDangerous" label="Dangerous Content"/>
                            <Typography>Drugs, Weapons, Regulated Products</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFCheckbox sx={{fontWeight: 600, fontSize: 20}} name="isHarassment" label="Harrasment or Criticism"/>
                            <Typography>Insults, Threats, non-consensual content</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFCheckbox sx={{fontWeight: 600, fontSize: 20}} name="isPrivacy" label="Privacy Violation"/>
                            <Typography>Personal Information included</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFCheckbox sx={{fontWeight: 600, fontSize: 20}} name="isIntellectual" label="Intellectual Property"/>
                            <Typography>Copyright or Trademark infringement</Typography>
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
            </FormProvider>
        </>
    );
}

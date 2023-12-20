import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {useCallback} from 'react';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Box, Grid, Card, Stack, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import {fData} from '../../../utils/formatNumber';
// _mock
// components
import {FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar} from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function Home() {
    const {enqueueSnackbar} = useSnackbar();

    const {user} = useAuth();

    const UpdateUserSchema = Yup.object().shape({
        displayName: Yup.string().required('Name is required'),
    });

    const defaultValues = {
        displayName: user?.displayName || '',
        email: user?.email || '',
        photoURL: user?.photoURL || '',
        phoneNumber: user?.phoneNumber || '',
        country: user?.country || '',
        address: user?.address || '',
        state: user?.state || '',
        city: user?.city || '',
        zipCode: user?.zipCode || '',
        about: user?.about || '',
        isPublic: user?.isPublic || false,
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Update success!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'photoURL',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <div sx={{py: 10, px: 3, textAlign: 'center'}}>
                            <RHFUploadAvatar
                                name="photoURL"
                                accept="image/*"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 2,
                                            mx: 'auto',
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Allowed *.jpeg, *.jpg, *.png, *.gif
                                        <br/> max size of {fData(3145728)}
                                    </Typography>
                                }
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <div sx={{p: 3}}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 3,
                                    gridTemplateColumns: '1fr', // Set a single column for each row
                                }}
                            >
                                <div>
                                    <Typography sx={{fontSize: 'default', m: 1}}>Full name</Typography>
                                    <div style={{display: 'grid', rowGap: 2, gap: 5, gridTemplateColumns: '1fr 1fr'}}>
                                        <RHFTextField name="firstName" label="First name"/>
                                        <RHFTextField name="lastName" label="Last name"/>
                                    </div>
                                </div>

                                <div>
                                    <Typography sx={{fontSize: 'default', m: 1}}>User name</Typography>
                                    <RHFTextField name="userName" label="User name"/>
                                </div>

                                <div>
                                    <Typography sx={{fontSize: 'default', m: 1}}>Email</Typography>
                                    <RHFTextField name="email" label="Email"/>
                                </div>

                                <div>
                                    <Typography sx={{fontSize: 'default', m: 1}}>Title</Typography>
                                    <RHFTextField name="title" label="Title"/>
                                </div>
                            </Box>

                            <Stack spacing={3} alignItems="flex-start" sx={{mt: 3}}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Save Changes
                                </LoadingButton>
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </FormProvider>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}/>
                    <Grid item xs={12} md={6}>
                        <div sx={{p: 3}}>
                            <Box sx={{
                                '& > div': {
                                    marginBottom: 2,
                                },
                            }}>
                                <Typography sx={{fontSize: 24, fontWeight: 600, mb: 10, mt: 5}}>Change
                                    password</Typography>
                                <div>
                                    <Typography sx={{fontSize: 'default', m: 1}}>Current password</Typography>
                                    <RHFTextField type="password" name="currentPassword" label="Current password"/>
                                </div>
                                <div>
                                    <Typography sx={{fontSize: 'default', m: 1}}>New password</Typography>
                                    <RHFTextField type="password" name="newPassword" label="New password"/>
                                </div>
                                <div>
                                    <Typography sx={{fontSize: 'default', m: 1}}>Confirm password</Typography>
                                    <RHFTextField type="password" name="confirmPassword" label="Confirm password"/>
                                </div>
                            </Box>
                            <Stack spacing={3} alignItems="flex-start" sx={{mt: 3}}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Change password
                                </LoadingButton>
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </FormProvider>

        </>
    )
        ;
}

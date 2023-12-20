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
import {FormProvider, RHFTextField, RHFUploadAvatar} from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function Home() {
    const {enqueueSnackbar} = useSnackbar();

    const {user} = useAuth();

    const UpdateUserSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        userName: Yup.string().required('User name is required'),
        email: Yup.string().required('email is required'),
    });

    const profileDefaultValues = {
        photoURL: user?.photoURL || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        userName: user?.userName || '',
        email: user?.email || '',
        title: user?.title || '',
    };

    const profileMethods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues: profileDefaultValues,
    });


    const {
        setValue: setProfileValue,
        handleSubmit: handleProfileSubmit,
        formState: {isSubmitting: isProfileSubmitting},
    } = profileMethods;

    const onSubmitUserInfo = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Update user info success!');
        } catch (error) {
            console.error(error);
        }
    };

    const UpdatePasswordSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string().required('New password is required'),
        confirmPassword: Yup.string().required('Confirm password is required'),

    });

    const passwordDefaultValues = {
        currentPassword: user?.currentPassword || '',
        newPassword: user?.newPassword || '',
        confirmPassword: user?.confirmPassword || '',
    };

    const passwordMethods = useForm({
        resolver: yupResolver(UpdatePasswordSchema),
        defaultValues: passwordDefaultValues,
    });

    const {
        setValue: setPasswordValue,
        handleSubmit: handlePasswordSubmit,
        formState: {isSubmitting: isPasswordSubmitting},
    } = passwordMethods;

    const onSubmitPassword = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Update password success!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setProfileValue(
                    'photoURL',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setProfileValue]
    );

    return (
        <>
            <FormProvider methods={profileMethods} onSubmit={handleProfileSubmit(onSubmitUserInfo)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{py: 10, px: 3, textAlign: 'center'}}>
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
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Card style={{height: '100%'}} sx={{p: 3}}>
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
                                    <RHFTextField disabled name="email" label="Email"/>
                                </div>

                                <div>
                                    <Typography sx={{fontSize: 'default', m: 1}}>Title</Typography>
                                    <RHFTextField name="title" label="Title"/>
                                </div>
                            </Box>

                            <Stack spacing={3} alignItems="flex-start" sx={{mt: 3}}>
                                <LoadingButton type="submit" variant="contained" loading={isProfileSubmitting}>
                                    Save Changes
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>
            <div style={{marginTop: 50}}>
                <FormProvider methods={passwordMethods} onSubmit={handlePasswordSubmit(onSubmitPassword)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}/>
                        <Grid item xs={12} md={8}>
                            <Card sx={{p: 3}}>
                                <Box sx={{
                                    '& > div': {
                                        marginBottom: 2,
                                    },
                                }}>
                                    <Typography sx={{fontSize: 24, fontWeight: 600, mb: 5}}>Change password</Typography>
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
                                    <LoadingButton type="submit" variant="contained" loading={isPasswordSubmitting}>
                                        Change password
                                    </LoadingButton>
                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>
                </FormProvider>
            </div>

        </>
    )
        ;
}

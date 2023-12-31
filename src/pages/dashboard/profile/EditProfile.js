import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
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
import {updateUser} from "../../../api/user";
import {PATH_DASHBOARD} from "../../../routes/paths";
import {changePassword} from "../../../api/auth";

// ----------------------------------------------------------------------

export default function Home() {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    const {user} = useAuth();

    const UpdateUserSchema = Yup.object().shape({
        fullName: Yup.string().required('Full name is required'),
        userName: Yup.string().required('User name is required'),
        email: Yup.string().required('email is required'),
        avatar: Yup.mixed().optional()
    });

    const profileDefaultValues = {
        avatar: user?.avatarUrl || null,
        fullName: user?.fullName || '',
        userName: user?.userName || '',
        email: user?.email || '',
    };

    const profileMethods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues: profileDefaultValues,
    });


    const {
        getValues: getProfileValue,
        setValue: setProfileValue,
        handleSubmit: handleProfileSubmit,
        formState: {isSubmitting: isProfileSubmitting},
    } = profileMethods;

    const onSubmitUserInfo = async () => {
        const form = getProfileValue();
        console.log(form)
        const profileFormData = new FormData();
        profileFormData.append('avatar',form.avatar);
        profileFormData.append('fullName', form.fullName);
        profileFormData.append('email', form.email);
        console.log(profileFormData.values())
        updateUser(profileFormData).then(() => {
            enqueueSnackbar('Update user info success!');
            navigate(PATH_DASHBOARD.root, {replace: true})
        }).catch((err) => {
            enqueueSnackbar(err.toString(), {variant: 'error'});
        });
    };

    const UpdatePasswordSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string().required('New password is required'),
        confirmNewPassword: Yup.string().required('Confirm password is required'),

    });

    const passwordDefaultValues = {
        oldPassword: user?.oldPassword || '',
        newPassword: user?.newPassword || '',
        confirmNewPassword: user?.confirmNewPassword || '',
    };

    const passwordMethods = useForm({
        resolver: yupResolver(UpdatePasswordSchema),
        defaultValues: passwordDefaultValues,
    });

    const {
        getValues: getPasswordValue,
        handleSubmit: handlePasswordSubmit,
        formState: {isSubmitting: isPasswordSubmitting},
    } = passwordMethods;

    const onSubmitPassword = async () => {
        const form = getPasswordValue();
        changePassword(form).then(() => {
            enqueueSnackbar('Update password success!');
            navigate(PATH_DASHBOARD.root, {replace: true})
        }).catch((err) => {
            enqueueSnackbar(err.toString(), {variant: 'error'});
        });
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setProfileValue(
                    'avatar',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
                const form = getProfileValue();
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
                                name="avatar"
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
                                    <div>
                                        <RHFTextField name="fullName" label="Full name"/>
                                    </div>
                                </div>

                                <div>
                                    <Typography sx={{fontSize: 'default', m: 1}}>User name</Typography>
                                    <RHFTextField disabled name="userName" label="User name"/>
                                </div>

                                <div>
                                    <Typography sx={{fontSize: 'default', m: 1}}>Email</Typography>
                                    <RHFTextField name="email" label="Email"/>
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
                                        <RHFTextField type="password" name="oldPassword" label="Current password"/>
                                    </div>
                                    <div>
                                        <Typography sx={{fontSize: 'default', m: 1}}>New password</Typography>
                                        <RHFTextField type="password" name="newPassword" label="New password"/>
                                    </div>
                                    <div>
                                        <Typography sx={{fontSize: 'default', m: 1}}>Confirm password</Typography>
                                        <RHFTextField type="password" name="confirmNewPassword" label="Confirm password"/>
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

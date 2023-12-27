import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {Stack, IconButton, InputAdornment, Alert, Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import {useNavigate} from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate()
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    userName: Yup.string().required('User name required'),
    fullName: Yup.string().required('Full name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    dd: Yup.number().min(1, 'Day must be at least 1').max(31, 'Day must be at most 31').required('Day is required'),
    mm: Yup.number().min(1, 'Month must be at least 1').max(12, 'Month must be at most 12').required('Month is required'),
    yyyy: Yup.number().min(1900, 'Year must be reasonable').max(new Date().getFullYear(), 'Year must be reasonable').required('Year is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    userName: '',
    fullName: '',
    email: '',
    dd: 1,
    mm: 1,
    yyyy: 1900,
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const dateOfBirth = `${data.yyyy}-${data.mm.toString().padStart(2, '0')}-${data.dd.toString().padStart(2, '0')}`;
      await register(
          {
            email: data.email,
            password: data.password,
            userName: data.userName,
            fullName: data.fullName,
            dateOfBirth});
      navigate('/auth/verify')
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <RHFTextField name="userName" label="User name" />
          <RHFTextField name="fullName" label="Full name" />
          <RHFTextField name="email" label="Email address" />

          <Typography>Date of Birth</Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField name="yyyy" label="Year" />
            <RHFTextField name="mm" label="Month" />
            <RHFTextField name="dd" label="Day" />
          </Stack>

          <RHFTextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                ),
              }}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </FormProvider>
  );
}
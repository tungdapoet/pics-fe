import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {Grid, Card, Stack, Button, Typography} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
import {createPost} from "../../../api/posts";


// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------
export default function PinCreateForm(){
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const NewPicSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        imageUrl: Yup.mixed().required('Image is required')
    });

    const defaultValues = {
        title: '',
        description: '',
        imageUrl: null,
    };

    const methods = useForm({
        resolver: yupResolver(NewPicSchema),
        defaultValues,
    });

    const {
        getValues,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;


    const onSubmit = async () => {
        const form = getValues();
        console.log(form)
        const picData = new FormData();
        picData.append('title',form.title);
        picData.append('imageUrl', form.imageUrl)
        picData.append('description', form.description)
        console.log(picData)
        createPost(picData).then(() => {
            enqueueSnackbar('Post success!');
            navigate(PATH_DASHBOARD.root, {replace: true})
        }).catch((err) => {
            enqueueSnackbar(err.toString(), {variant: 'error'});
        })
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            console.log(file);
            if (file) {
                setValue(
                    'imageUrl',
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
                    <Grid item xs={12} md={8}>
                        <Card sx={{ p: 3 }}>
                            <Stack spacing={3}>
                                <div>
                                    <LabelStyle>Image</LabelStyle>
                                    <RHFUploadSingleFile name="imageUrl" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                                </div>
                            </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 3 }}>
                            <Stack spacing={3}>
                                <div>
                                    <LabelStyle>Title</LabelStyle>
                                    <RHFTextField name="title" label="Post Title" />
                                </div>

                                <div>
                                    <LabelStyle>Description</LabelStyle>
                                    <RHFTextField name="description" label="Description" multiline rows={3} />
                                </div>

                                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                                    <Button fullWidth to="/dashboard/home" color="inherit" variant="outlined" size="large" component={RouterLink}>
                                        Cancel
                                    </Button>
                                    <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                                        Post
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>
        </>
    );
}

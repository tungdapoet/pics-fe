import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Box} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';


// ----------------------------------------------------------------------

const TAGS_OPTION = [
    'Toy Story 3',
    'Logan',
    'Full Metal Jacket',
    'Dangal',
    'The Sting',
    '2001: A Space Odyssey',
    "Singin' in the Rain",
    'Toy Story',
    'Bicycle Thieves',
    'The Kid',
    'Inglourious Basterds',
    'Snatch',
    '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------
export default function PinCreateForm(){
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const handleOpenPreview = () => {
        console.log("Back to Pic Page")
    };


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

    const onSubmit = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            enqueueSnackbar('Post success!');
            navigate(PATH_DASHBOARD.blog.posts);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'cover',
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
                                    <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
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

                                <div>
                                    <LabelStyle>Tags</LabelStyle>
                                    <Controller
                                        name="tags"
                                        control={control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                multiple
                                                freeSolo
                                                onChange={(event, newValue) => field.onChange(newValue)}
                                                options={TAGS_OPTION.map((option) => option)}
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => (
                                                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                                                    ))
                                                }
                                                renderInput={(params) => <TextField label="Tags" {...params} />}
                                            />
                                        )}
                                    />
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

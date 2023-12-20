import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
// @mui
import {
    Box,
    Tab,
    Card,
    Grid,
    Divider,
    Container,
    Typography,
    CardMedia,
    CardContent,
    Avatar,
    Button, TextField
} from '@mui/material';
// redux
import {useDispatch, useSelector} from '../../../redux/store';
import {getImage} from '../../../redux/slices/image';
// routes
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import {SkeletonProduct} from '../../../components/skeleton';

import CartWidget from '../../../sections/@dashboard/e-commerce/CartWidget';
import ProductDetailsReviewList from "../../../sections/@dashboard/e-commerce/product-details/ProductDetailsReviewList";
import ImageCommentList from "../../../sections/@dashboard/image/ImageCommentList";
import Iconify from "../../../components/Iconify";
import {fShortenNumber} from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

export default function Home() {
    const {themeStretch} = useSettings();
    const dispatch = useDispatch();
    const {name = ''} = useParams();
    const {image, error} = useSelector((state) => state.image);

    useEffect(() => {
        dispatch(getImage(name));
        console.log(image)
    }, [dispatch, name]);


    return (
        <Page title="Image Details">
            <Container maxWidth={themeStretch ? false : 'lg'}>

                <CartWidget/>

                {image && (
                    <>
                        <Card>
                            <Grid container>
                                <Grid item xs={6}>
                                    <CardMedia component="img" image={image.src} alt="Image"/>
                                </Grid>

                                <Grid item xs={6}>
                                    <CardContent
                                        style={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <div>
                                            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                                                <Grid item style={{display: 'flex', alignItems: 'center'}}>
                                                    <Avatar sx={{mr: 2}} src={image.user.avatar} alt="Avatar"/>
                                                    <div>
                                                        <Typography variant="h6">{image.user.name}</Typography>
                                                        <Typography
                                                            variant="body2">{image.user.followers} followers
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="primary">
                                                        Follow
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        color="inherit"
                                                        startIcon={<Iconify icon='uiw:more' />}
                                                    />
                                                </Grid>

                                            </Grid>

                                            <Typography sx={{mt: 5}} variant="h4">
                                                {image.title}
                                            </Typography>

                                            <Typography sx={{mt: 2}}>
                                                {image.description}
                                            </Typography>

                                            <Typography sx={{mt: 5}} variant="h4">
                                                Comments
                                            </Typography>

                                            <ImageCommentList image={image}/>
                                        </div>

                                        <div>
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <Typography variant="h6">
                                                    {image.comments.length} comments
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    color="inherit"
                                                    startIcon={<Iconify icon='icon-park-solid:like' />}
                                                >
                                                    {image.like}
                                                </Button>

                                            </div>
                                            <TextField
                                                variant="outlined"
                                                label="Write your comment"
                                                fullWidth
                                                margin="normal"
                                            />
                                        </div>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </>
                )}

                {!image && <SkeletonProduct/>}

                {error && <Typography variant="h6">Image not found</Typography>}
            </Container>
        </Page>
    );
}

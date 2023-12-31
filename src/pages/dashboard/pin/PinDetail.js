import {NavLink as RouterLink, useNavigate, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {useSnackbar} from "notistack";
// @mui
import {
    Box,
    Card,
    Grid,
    Container,
    Typography,
    CardMedia,
    CardContent,
    Avatar,
    Button, TextField, IconButton, MenuItem, Stack, Chip
} from '@mui/material';
// routes
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import PinCommentList from "../../../sections/@dashboard/pins/PinCommentList";
import Iconify from "../../../components/Iconify";
import {PageNotFoundIllustration} from "../../../assets";
import MenuPopover from "../../../components/MenuPopover";
import PinReportForm from "../../../sections/@dashboard/pins/PinReportForm";
import {DialogAnimate} from "../../../components/animate";
import {createComment, getPostById, sharePost} from "../../../api/posts";
import {PATH_DASHBOARD} from "../../../routes/paths";
import {handleFollow} from "../../../api/follow";
import Scrollbar from "../../../components/Scrollbar";


export default function PinDetail() {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const {id} = useParams();
    const {themeStretch} = useSettings();
    const {name = ''} = useParams();
    const [pin, setPin] = useState({})
    const [isCopied, setIsCopied] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isOpenReportForm, setIsOpenReportForm] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [liked, setLiked] = useState(false);


    useEffect(async () => {
        getPostById(id).then((res) => {
            setPin(res.data)
            // setIsFollowing(res.)
        })
    }, []);

    const handleSubmitReport = () => {
        setIsOpenReportForm(false)
    }

    const handleSharePic = () => {
        sharePost(id).then((res) => {
            enqueueSnackbar(res.message);
            navigate(PATH_DASHBOARD.root);
        })
    }

    const handleOpenReportForm = () => {
        setIsOpenReportForm(true)
    }

    const copyImageToClipboard = () => {
        navigator.clipboard.writeText(pin.imageUrl)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 3000);
            })
            .catch((error) => {
                console.error('Unable to copy to clipboard:', error);
            });
    }

    const downloadImage = () => {
        fetch(pin.imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const imageUrl = window.URL.createObjectURL(new Blob([blob]));

                const link = document.createElement('a');
                link.href = imageUrl;
                link.setAttribute('download', 'downloaded_image.png');

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(imageUrl);
            })
            .catch((error) => {
                console.error('Error downloading image:', error);
            });
    };

    const handleClickFollow = async () => {
        const action = isFollowing ? 'UNFOLLOW' : 'FOLLOW'; // Determine action based on current state
        try {
            await handleFollow(id, action);

            setIsFollowing((prevState) => !prevState);
            const message = action === 'FOLLOW' ? 'You are now following' : 'You have unfollowed';
            enqueueSnackbar(message);
        } catch (error) {
            console.error('Error toggling follow:', error);
            enqueueSnackbar('Error toggling follow', {variant: 'error'});
        }
    };

    const handleClickLike = async () => {
        try {
            setLiked(!liked);
        } catch (error) {
            console.error('Error click like:', error);
            // Handle error accordingly
        }
    };

    const handleSendComment = async () => {
        try {
            if (newComment.trim() !== '') {
                const body = {
                    postId: id,
                    comment: newComment
                }
                await createComment(body);
                navigate(0);
                enqueueSnackbar('Comment created successfully.');
                setNewComment('');
            } else {
                enqueueSnackbar('Please enter a comment.', {variant: 'error'});
            }
        } catch (error) {
            console.error('Error creating comment:', error);
            enqueueSnackbar('Error creating comment.', {variant: 'error'});
        }
    };

    return (
        <Page title="Pic Detail">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                {pin ? (
                    <>
                        <Card>
                            <Grid container>
                                <Grid item xs={6}>
                                    <CardMedia component="img" image={pin?.imageUrl} alt="Image"/>
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
                                            <Stack
                                                sx={{mb: 6}}
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <div>
                                                    <MoreMenuButton handleClickReport={handleOpenReportForm}/>
                                                    <IconButton onClick={handleSharePic}>
                                                        <Iconify icon={'material-symbols:upload'} width={24}
                                                                 height={24}/>
                                                    </IconButton>
                                                    <IconButton onClick={copyImageToClipboard}>
                                                        <Iconify icon={'bx:link'} width={24} height={24}/>
                                                    </IconButton>
                                                    {isCopied && <Chip label="Copied to clipboard!" color="primary"/>}
                                                </div>
                                                <Button onClick={downloadImage} variant="contained" color="primary">
                                                    Save
                                                </Button>
                                            </Stack>

                                            <Typography sx={{mt: 5}} variant="h4">
                                                {pin?.title}
                                            </Typography>

                                            <Typography sx={{mt: 2, mb: 5}}>
                                                {pin?.description}
                                            </Typography>

                                            <Grid container alignItems="center" justifyContent="space-between"
                                                  spacing={2}>
                                                <Grid item style={{display: 'flex', alignItems: 'center'}}>
                                                    <Avatar sx={{mr: 2}} src={pin?.user?.avatar} alt="Avatar"/>
                                                    <div>
                                                        <Typography
                                                            variant="h6">{pin?.dataResponseUser?.fullName}</Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        color={isFollowing ? 'secondary' : 'primary'}
                                                        onClick={handleClickFollow}
                                                    >
                                                        {isFollowing ? 'Unfollow' : 'Follow'}
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                            <Typography sx={{mt: 5}} variant="h6">
                                                Comments
                                            </Typography>
                                            <Scrollbar>
                                                <PinCommentList items={pin.dataResponseComments}/>
                                            </Scrollbar>
                                        </div>

                                        <div>
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <Typography variant="h6">
                                                    {pin?.numberOfComments} comments
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    startIcon={<Iconify icon='icon-park-solid:like'/>}
                                                    onClick={handleClickLike}
                                                >
                                                    {liked ? pin?.numberOfLikes + 1 : pin?.numberOfLikes}
                                                </Button>

                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <TextField
                                                    variant="outlined"
                                                    label="Write your comment"
                                                    fullWidth
                                                    margin="normal"
                                                    style={{flex: '1'}}
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                />
                                                <Button
                                                    sx={{ml: 2}}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleSendComment}
                                                >
                                                    Send
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </>
                ) : (
                    <Box sx={{maxWidth: 480, margin: 'auto', textAlign: 'center'}}>
                        <Typography variant="h3" paragraph>
                            Pic Not Found.
                        </Typography>

                        <Typography sx={{color: 'text.secondary'}}>This Pic might be deleted</Typography>

                        <PageNotFoundIllustration sx={{height: 260, my: {xs: 5, sm: 10}}}/>

                        <Button to="/" size="large" variant="contained" component={RouterLink}>
                            Go to Home
                        </Button>
                    </Box>
                )}
            </Container>
            <DialogAnimate open={isOpenReportForm} title="Report Pin">
                <PinReportForm id={pin?.id} onClose={() => setIsOpenReportForm(false)} callback={handleSubmitReport}/>
            </DialogAnimate>
        </Page>
    );
}

//----------------------------------------------------------------------------------------------------------------------

function MoreMenuButton({handleClickReport}) {
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const ICON = {
        mr: 2,
        width: 20,
        height: 20,
    };

    return (
        <>
            <IconButton size="large" onClick={handleOpen}>
                <Iconify icon={'eva:more-horizontal-fill'} width={20} height={20}/>
            </IconButton>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                arrow="right-top"
                sx={{
                    mt: -0.5,
                    width: 'auto',
                    '& .MuiMenuItem-root': {px: 1, typography: 'body2', borderRadius: 0.75},
                }}
            >
                <MenuItem sx={{color: 'error.main'}} onClick={handleClickReport}>
                    <Iconify icon={'ic:round-report'} sx={{...ICON}}/>
                    Report
                </MenuItem>
            </MenuPopover>
        </>
    );
}
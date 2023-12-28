import React, {useEffect, useState} from 'react';
import {Container, Typography, Avatar, Grid, Button, Card, Box, Paper} from '@mui/material';
import {NavLink as RouterLink, useNavigate} from 'react-router-dom';
import Page from "../../../components/Page";
import useSettings from "../../../hooks/useSettings";
import MasonryGallery from "../../../components/MasonryGallery";
import {UploadIllustration} from "../../../assets";
import {PATH_DASHBOARD} from "../../../routes/paths";
import useAuth from "../../../hooks/useAuth";
import {getUserById, getUserInformation} from "../../../api/user";

// ----------------------------------------------------------------------

const StatCard = ({number, label}) => (
    <Card sx={{
        width: 150,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Typography variant="h6">{number}</Typography>
        <Typography variant="subtitle2">{label}</Typography>
    </Card>
);


export default function UserProfile() {
    const { user } = useAuth();
    const [items, setItems] = useState([])
    const {themeStretch} = useSettings();
    const navigate = useNavigate();
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);

    useEffect(async () => {
        const res = await getUserInformation(user.id);
        setItems(res.posts)
        setFollowers(res.numberOfFollower)
        setNumberOfPosts(res.postNumber)
        setFollowing(res.numberOfFollowing)
    }, []);

    return (
        <Page title="Profile">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Paper elevation={3} sx={{
                    p: 3,
                    mb: 5,
                    bgcolor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Box sx={{textAlign: 'center', my: 4}}>
                        <Avatar
                            alt={user?.fullName}
                            src={user?.avatarUrl}
                            sx={{width: 140, height: 140, mx: 'auto'}}
                        />
                        <Typography variant="h4" sx={{mt: 2}}>{user?.fullName}</Typography>
                        <Typography gutterBottom>{user?.email}</Typography>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item><StatCard number={numberOfPosts} label="Pics"/></Grid>
                            <Grid item><StatCard number={followers} label="Followers"/></Grid>
                            <Grid item><StatCard number={following} label="Following"/></Grid>
                        </Grid>

                        <Box sx={{mt: 3}}>
                            <Button
                                onClick={() => navigate(PATH_DASHBOARD.general.profile.edit)}
                                variant="contained" sx={{mr: 1}}>Edit</Button>
                        </Box>
                    </Box>
                </Paper>
                {!items.length ?
                    (
                        <Box sx={{maxWidth: 480, margin: 'auto', textAlign: 'center'}}>
                            <Typography variant="h3" paragraph>
                                No Pics found.
                            </Typography>

                            <Typography sx={{color: 'text.secondary'}}>Start Creating Pics</Typography>

                            <UploadIllustration sx={{height: 260, my: {xs: 5, sm: 10}}}/>

                            <Button to="/" size="large" variant="contained" component={RouterLink}>
                                Create Pic
                            </Button>
                        </Box>
                    ) : (
                        <MasonryGallery items={items}/>
                    )
                }
            </Container>
        </Page>
    );
}

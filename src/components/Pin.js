import React from 'react';
import {useNavigate} from "react-router-dom";
import {Avatar, Card, CardContent, CardMedia, Stack, Typography} from '@mui/material';
import PropTypes from "prop-types";
import createAvatar from "../utils/createAvatar";
import {PATH_DASHBOARD} from "../routes/paths";

Pin.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    image: PropTypes.any
};

export default function Pin({ title, author, image }) {

    const navigate = useNavigate();
    const handleClick = () => {
        console.log('hello');
    };



    return (
        <Card sx={{ maxWidth: 345, boxShadow: 3, cursor: 'pointer' }} onClick={handleClick}>
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                }}
                onClick={() => navigate(PATH_DASHBOARD.general.pin.detail)}
            />
            <CardContent sx={{ textAlign: 'left' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                    {title}
                </Typography>

                <Stack
                    onClick={() => navigate(PATH_DASHBOARD.general.profile.user)}
                    direction="row" alignItems="center" spacing={2}>
                    <Avatar
                        src={author?.photoURL}
                        alt={author?.displayName}
                        color={author?.photoURL ? 'default' : createAvatar(author?.displayName).color}
                    >
                        {createAvatar(author?.displayName).name}
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                        {author}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};



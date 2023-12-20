import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Pin = ({ title, author, image }) => {

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
                    width: '100%', // Take the full width of the card
                    height: 'auto', // Adjust height automatically to maintain aspect ratio
                    objectFit: 'contain' // Prevent stretching, might add letterboxing
                }}
            />
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {author}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Pin;

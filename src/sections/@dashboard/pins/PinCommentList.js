import PropTypes from 'prop-types';
import {useState} from 'react';
// @mui
import {
    Box,
    List,
    Button,
    Rating,
    Avatar,
    ListItem,
    Pagination,
    Typography,
    ListItemAvatar,
    ListItemText
} from '@mui/material';
// utils
import {fDate} from '../../../utils/formatTime';
import {fShortenNumber} from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

PinCommentList.propTypes = {
    image: PropTypes.object,
};

export default function PinCommentList({image}) {
    console.log(image)
    const {comments} = image;

    return (
        <Box sx={{pt: 3, px: 2, pb: 5}}>
            <List disablePadding>
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment}/>
                ))}
            </List>
        </Box>
    );
}

// ----------------------------------------------------------------------

CommentItem.propTypes = {
    comment: PropTypes.object,
};

function CommentItem({comment}) {

    const {user, content, createdAt} = comment;

    return (
        <>
            <ListItem
                disableGutters
                sx={{
                    mb: 5
                }}
            >
                <Box
                    sx={{
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        mb: {xs: 2, sm: 0},
                        textAlign: {sm: 'center'},
                    }}
                >
                    <ListItemAvatar>
                        <Avatar src={user.avatar} sx={{width: 48, height: 48}}/>
                    </ListItemAvatar>

                    <ListItemText
                        primary={user.name}
                        primaryTypographyProps={{variant: 'subtitle1'}}
                        secondary={
                            <div style={{textAlign: 'left'}}>
                                <Typography
                                    gutterBottom
                                    variant="caption"
                                    sx={{
                                        display: 'block',
                                        color: 'text.disabled',
                                    }}
                                >
                                    {fDate(createdAt)}
                                </Typography>
                                <Typography component="span" variant="body2">
                                    {content}
                                </Typography>
                            </div>
                        }
                    />

                </Box>

            </ListItem>
        </>
    );
}

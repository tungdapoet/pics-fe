import PropTypes, {object} from 'prop-types';
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
    items: PropTypes.arrayOf(object),
};

export default function PinCommentList({items}) {
    return (
        <Box sx={{pt: 3, px: 2, pb: 5}}>
            <List disablePadding>
                {items?.length && items.length ? items.map((comment) => (
                    <CommentItem key={comment?.id} comment={comment}/>
                )) :
                <Typography>
                    No comments yet, leave some comments below
                </Typography>
                }
            </List>
        </Box>
    );
}

// ----------------------------------------------------------------------

CommentItem.propTypes = {
    comment: PropTypes.object,
};

function CommentItem({comment}) {

    const {fullName, content, createdAt} = comment;

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
                    <ListItemText
                        primary={fullName}
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
                                    {createdAt}
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

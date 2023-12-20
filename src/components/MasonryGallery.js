
import React from 'react';
import Masonry from '@mui/lab/Masonry';
import Pin from './Pin';

const MasonryGallery = ({ items }) => {
    return (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
            {items.map((item, index) => (
                <Pin key={index} title={item.title} author={item.author} image={item.image} />
            ))}
        </Masonry>
    );
};

export default MasonryGallery;

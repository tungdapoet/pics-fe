import PropTypes, {any} from "prop-types";
import React from 'react';
import Masonry from '@mui/lab/Masonry';
import Pin from './Pin';


MasonryGallery.propTypes = {
    items: PropTypes.arrayOf(any)
};
export default function MasonryGallery({ items }) {
    return (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
            {items.map((item, index) => (
                <Pin key={index} userId={item.dataResponseUser.id} id={item.id} title={item.title} author={item.dataResponseUser.fullName} image={item.imageUrl} />
            ))}
        </Masonry>
    );
};



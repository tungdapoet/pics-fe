import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: null,
    images: [],
    image: {
        url: '/1',
        src: 'https://picsum.photos/1080/1920',
        title: 'Image title 1',
        description: 'Image description 1',
        like: 2,
        user: {
            id: '',
            name: 'Posted user',
            avatar: 'https://picsum.photos/300/300',
            followers: 200
        },
        comments: [
            {
                id: '1',
                user: {
                    id: '123',
                    name: 'Comment user 1',
                    avatar: 'https://picsum.photos/300/300',
                },
                createdAt: '12-11-2023',
                content: 'Content 1',
                like: 1,
            },
            {
                id: '2',
                user: {
                    id: '456',
                    name: 'Comment user 2',
                    avatar: 'https://picsum.photos/300/300',
                },
                createdAt: '12-11-2023',
                content: 'Content 2',
                like: 1,
            },
        ]
    },
    sortBy: null,
    filters: {
        gender: [],
        category: 'All',
        colors: [],
    },
};

const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        // GET PRODUCTS
        getImagesSuccess(state, action) {
            state.isLoading = false;
            state.images = action.payload;
        },

        // GET PRODUCT
        getImageSuccess(state, action) {
            state.isLoading = false;
            state.image = action.payload;
        },

        //  SORT & FILTER PRODUCTS
        sortByProducts(state, action) {
            state.sortBy = action.payload;
        },

        filterProducts(state, action) {
            state.filters.gender = action.payload.gender;
            state.filters.category = action.payload.category;
            state.filters.colors = action.payload.colors;
        },
    },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function listImages() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/image/all');
            dispatch(slice.actions.getImagesSuccess(response.data.images));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function getImage(name) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            // const response = await axios.get('/api/image', {
            //     params: { name },
            // });
            const response = {
                data: {
                    image: initialState.image
                }
            }
            dispatch(slice.actions.getImageSuccess(response.data.image));
        } catch (error) {
            console.error(error);
            dispatch(slice.actions.hasError(error));
        }
    };
}

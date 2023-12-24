import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: null,
    pins: [],
    pin: {
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
    filters: {
        tags: [],
    },
};

const slice = createSlice({
    name: 'pin',
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

        // GET PIN LIST
        getPinListSuccess(state, action) {
            state.isLoading = false;
            state.pinList = action.payload;
        },

        // GET PRODUCT
        getPinSuccess(state, action) {
            state.isLoading = false;
            state.pin = action.payload;
        },

        // FILTER
        filterPins(state, action) {
            state.filters.tag = action.payload.tag;
        },
    },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

// export function PinList() {
//     return async () => {
//         dispatch(slice.actions.startLoading());
//         try {
//             const response = await axios.get('/api/image/all');
//             dispatch(slice.actions.getImagesSuccess(response.data.images));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// ----------------------------------------------------------------------

export function getPin(name) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            // const response = await axios.get('/api/image', {
            //     params: { name },
            // });
            const response = {
                data: {
                    pin: initialState.pin
                }
            }
            dispatch(slice.actions.getPinSuccess(response.data.pin));
        } catch (error) {
            console.error(error);
            dispatch(slice.actions.hasError(error));
        }
    };
}

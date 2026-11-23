import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ids: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const trackId = String(action.payload);
            if (state.ids.includes(trackId)) {
                state.ids = state.ids.filter((id) => id !== trackId);
            } else {
                state.ids.push(trackId);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectFavoriteIds = (state) => state.favorites.ids;
export const selectFavoritesCount = (state) => state.favorites.ids.length;

export default favoritesSlice.reducer;

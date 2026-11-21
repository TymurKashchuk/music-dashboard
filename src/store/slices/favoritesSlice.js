import { createSlice } from '@reduxjs/toolkit';

function loadFavorites() {
    try {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

const initialState = {
    ids: loadFavorites(),
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
            localStorage.setItem('favorites', JSON.stringify(state.ids));
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectFavoriteIds = (state) => state.favorites.ids;
export const selectFavoritesCount = (state) => state.favorites.ids.length;

export default favoritesSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice.js';
import filtersReducer from './slices/filtersSlice.js';
import favoritesReducer from './slices/favoritesSlice.js';
import uiReducer from './slices/uiSlice.js';
import tracksReducer from './slices/tracksSlice.js';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        filters: filtersReducer,
        favorites: favoritesReducer,
        ui: uiReducer,
        tracks: tracksReducer,
    },
});

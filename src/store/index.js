import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './slices/themeSlice.js';
import filtersReducer from './slices/filtersSlice.js';
import favoritesReducer from './slices/favoritesSlice.js';
import uiReducer from './slices/uiSlice.js';
import tracksReducer from './slices/tracksSlice.js';

const rootReducer = combineReducers({
    theme: themeReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
    ui: uiReducer,
    tracks: tracksReducer,
});

const persistConfig = {
    key: 'music-dashboard',
    storage,
    whitelist: ['theme', 'favorites', 'ui'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    byId: {},
};

const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        cacheTracks: (state, action) => {
            for (const track of action.payload || []) {
                if (track?.id) {
                    state.byId[String(track.id)] = track;
                }
            }
        },
        cacheTrack: (state, action) => {
            const track = action.payload;
            if (track?.id) {
                state.byId[String(track.id)] = track;
            }
        },
    },
});

export const { cacheTracks, cacheTrack } = tracksSlice.actions;

export const selectTrackById = (id) => (state) => state.tracks.byId[String(id)] || null;

export default tracksSlice.reducer;

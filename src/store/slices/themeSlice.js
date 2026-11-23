import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'dark',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.mode;
export const selectIsDark = (state) => state.theme.mode === 'dark';

export default themeSlice.reducer;

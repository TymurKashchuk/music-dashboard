import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chartType: 'bar',
    viewMode: 'comfortable',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setChartType: (state, action) => {
            state.chartType = action.payload;
        },
        toggleViewMode: (state) => {
            state.viewMode = state.viewMode === 'comfortable' ? 'compact' : 'comfortable';
        },
    },
});

export const { setChartType, toggleViewMode } = uiSlice.actions;

export const selectChartType = (state) => state.ui.chartType;
export const selectViewMode = (state) => state.ui.viewMode;

export default uiSlice.reducer;

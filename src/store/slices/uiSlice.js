import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chartType: localStorage.getItem('chartType') || 'bar',
    viewMode: localStorage.getItem('viewMode') || 'comfortable',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setChartType: (state, action) => {
            state.chartType = action.payload;
            localStorage.setItem('chartType', state.chartType);
        },
        toggleViewMode: (state) => {
            state.viewMode = state.viewMode === 'comfortable' ? 'compact' : 'comfortable';
            localStorage.setItem('viewMode', state.viewMode);
        },
    },
});

export const { setChartType, toggleViewMode } = uiSlice.actions;

export const selectChartType = (state) => state.ui.chartType;
export const selectViewMode = (state) => state.ui.viewMode;

export default uiSlice.reducer;

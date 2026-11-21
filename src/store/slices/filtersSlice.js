import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_FILTERS = {
    search: '',
    genre: 'all',
    limit: 20,
    order: 'popularity_total_desc',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState: INITIAL_FILTERS,
    reducers: {
        setFilters: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetFilters: () => INITIAL_FILTERS,
    },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;
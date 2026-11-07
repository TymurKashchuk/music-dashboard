/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback } from 'react';

export const INITIAL_FILTERS = {
    search: '',
    genre: 'all',
    limit: 20,
    order: 'popularity_total_desc',
};

export const FilterContext = createContext(null);

export function FilterProvider({ children }) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const resetFilters = useCallback(() => {
        setFilters(INITIAL_FILTERS);
    }, []);

    return (
        <FilterContext.Provider value={{ filters, setFilters, resetFilters, INITIAL_FILTERS }}>
            {children}
        </FilterContext.Provider>
    );
}

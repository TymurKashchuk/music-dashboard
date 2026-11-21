import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleTheme } from '../../store/slices/themeSlice.js';

function ThemeToggle() {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();

    return (
        <button
            type="button"
            onClick={() => dispatch(toggleTheme())}
            className="theme-toggle-btn"
        >
            {theme === 'dark' ? 'Світла тема' : 'Темна тема'}
        </button>
    );
}

export default ThemeToggle;

import { useTheme } from '../../hooks/useTheme.js';

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
        >
            {theme === 'dark' ? 'Світла тема' : 'Темна тема'}
        </button>
    );
}

export default ThemeToggle;

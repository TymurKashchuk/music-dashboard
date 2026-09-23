import { useState } from 'react';

function ViewToggle({ onViewChange }) {
    const [isCompact, setIsCompact] = useState(false);

    function handleToggle() {
        const nextMode = !isCompact;
        setIsCompact(nextMode);
        onViewChange?.(nextMode ? 'compact' : 'comfortable');
    }

    return (
        <div className="widget">
            <h3>Режим списку треків</h3>
            <p className="widget-desc">
                Поточний вигляд: <strong>{isCompact ? 'Компактний' : 'Зручний'}</strong>
            </p>

            <div className="toggle-box">
                <button
                    type="button"
                    className="toggle-btn"
                    onClick={handleToggle}
                >
                    {isCompact ? 'Перемкнути на зручний' : 'Перемкнути на компактний'}
                </button>
            </div>
        </div>
    );
}

export default ViewToggle;
import { useDispatch, useSelector } from 'react-redux';
import { selectViewMode, toggleViewMode } from '../../store/slices/uiSlice.js';

function ViewToggle() {
    const viewMode = useSelector(selectViewMode);
    const dispatch = useDispatch();
    const isCompact = viewMode === 'compact';

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
                    onClick={() => dispatch(toggleViewMode())}
                >
                    {isCompact ? 'Перемкнути на зручний' : 'Перемкнути на компактний'}
                </button>
            </div>
        </div>
    );
}

export default ViewToggle;

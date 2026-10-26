import { useState } from 'react';

function Counter({ initialValue = 0, title = 'Лічильник прослуховувань' }) {
    const [count, setCount] = useState(initialValue);

    function handleIncrement() {
        setCount((prev) => prev + 1);
    }

    function handleDecrement() {
        setCount((prev) => Math.max(0, prev - 1));
    }

    function handleReset() {
        setCount(initialValue);
    }

    return (
        <div className="widget">
            <h3>{title}</h3>
            <p className="widget-desc">Локальний стан через useState</p>

            <div className="counter-box">
                <span className="counter-value">{count}</span>

                <div className="counter-buttons">
                    <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={count === 0}
                        aria-label="Зменшити"
                    >
                        −
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={count === initialValue}
                    >
                        Скинути
                    </button>
                    <button
                        type="button"
                        onClick={handleIncrement}
                        aria-label="Збільшити"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Counter;
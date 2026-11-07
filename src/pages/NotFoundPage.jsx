import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="widget status-box error not-found-box">
            <h2>404 — Сторінку не знайдено</h2>
            <p className="status-tip">
                Такої адреси не існує або запитаний ресурс було переміщено.
            </p>
            <Link to="/" className="btn-back">
                Повернутися на головну
            </Link>
        </div>
    );
}

export default NotFoundPage;

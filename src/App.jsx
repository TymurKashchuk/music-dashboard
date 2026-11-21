import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from './store/slices/themeSlice.js';
import ThemeToggle from './components/widgets/ThemeToggle.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TrackDetailsPage from './pages/TrackDetailsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
    const theme = useSelector(selectTheme);

    return (
        <div className="app-theme-wrapper" data-theme={theme}>
            <BrowserRouter>
                <div className="dashboard-container">
                    <header className="dashboard-header">
                        <div>
                            <h1>
                                <Link to="/" className="header-brand">
                                    Музичний Дашборд Jamendo
                                </Link>
                            </h1>
                            <p className="dashboard-subtitle">
                                ЛР5: Глобальний стан (Redux Toolkit), обране та інтерактивна візуалізація
                            </p>
                        </div>
                        <ThemeToggle />
                    </header>

                    <main>
                        <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/track/:id" element={<TrackDetailsPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;

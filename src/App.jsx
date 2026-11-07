import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { FilterProvider } from './context/FilterContext.jsx';
import ThemeToggle from './components/widgets/ThemeToggle.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TrackDetailsPage from './pages/TrackDetailsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
    return (
        <ThemeProvider>
            <FilterProvider>
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
                                    ЛР4: Багатосторінковий інтерфейс (React Router v7), дрілдаун та Context API
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
            </FilterProvider>
        </ThemeProvider>
    );
}

export default App;

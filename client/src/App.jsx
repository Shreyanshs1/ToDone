import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import SummaryPage from './pages/SummaryPage';

function App() {
  return (
    <Routes>
      {/* Public route: everyone can see this */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected routes: only logged-in users can see */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
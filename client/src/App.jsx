import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import SummaryPage from './pages/SummaryPage';
import Layout from './components/Layout'; // <-- 1. IMPORT

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      {/* 2. WRAP protected routes in the Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
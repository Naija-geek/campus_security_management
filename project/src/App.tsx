import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/Toast';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DutyManagement from './pages/DutyManagement';
import LeaveManagement from './pages/LeaveManagement';
import Financial from './pages/Financial';
import PersonnelDirectory from './pages/PersonnelDirectory';

// CSS
import './index.css';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="duties" element={<DutyManagement />} />
            <Route path="leaves" element={<LeaveManagement />} />
            <Route path="financial" element={<Financial />} />
            <Route path="personnel" element={<PersonnelDirectory />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
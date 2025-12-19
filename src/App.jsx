import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components';

// Client Pages
import LandingPage from './pages/LandingPage';
import ClassificationPage from './pages/ClassificationPage';
import ExpertListPage from './pages/ExpertListPage';
import WizardPage from './pages/WizardPage';
import DiagnosisPage from './pages/DiagnosisPage';
import BookingPage from './pages/BookingPage';
import ProposalPage from './pages/ProposalPage';

// Expert Backoffice Pages
import ExpertDashboard, { ExpertLayout } from './pages/expert/ExpertDashboard';
import LeadInboxPage from './pages/expert/LeadInboxPage';
import SchedulePage from './pages/expert/SchedulePage';
import ProposalManagerPage from './pages/expert/ProposalManagerPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/wizard" element={<WizardPage />} />
            <Route path="/diagnosis" element={<DiagnosisPage />} />
            <Route path="/classification" element={<ClassificationPage />} />
            <Route path="/experts" element={<ExpertListPage />} />
            <Route path="/experts/:id" element={<ExpertListPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/proposals" element={<ProposalPage />} />
            <Route path="/proposals/:id" element={<ProposalPage />} />

            {/* Expert Backoffice Routes */}
            <Route path="/expert" element={<ExpertLayout />}>
              <Route index element={<ExpertDashboard />} />
              <Route path="leads" element={<LeadInboxPage />} />
              <Route path="schedule" element={<SchedulePage />} />
              <Route path="proposals" element={<ProposalManagerPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;



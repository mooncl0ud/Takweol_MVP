import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HeroPage from './pages/client/wizard/HeroPage';
import DiagnosisPage from './pages/client/diagnosis/DiagnosisPage';
import BookingPage from './pages/client/booking/BookingPage';
import ProposalPage from './pages/client/proposal/ProposalPage';
import { LayoutClient } from './components/layout/LayoutClient';
import { LayoutExpert } from './components/layout/LayoutExpert';
import LeadInboxPage from './pages/expert/leads/LeadInboxPage';
import ProposalBuilderPage from './pages/expert/proposal/ProposalBuilderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect Root to Problem Wizard */}
        <Route path="/" element={<Navigate to="/wizard/problem" replace />} />

        {/* Client Portal Routes */}
        <Route element={<LayoutClient />}>
          <Route path="/wizard/problem" element={<HeroPage />} />

          {/* Future Routes */}
          <Route path="/diagnosis" element={<DiagnosisPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/proposal" element={<ProposalPage />} />
        </Route>

        {/* Expert Portal Routes */}
        <Route path="/expert" element={<LayoutExpert />}>
          <Route index element={<Navigate to="/expert/inbox" replace />} />
          <Route path="inbox" element={<LeadInboxPage />} />
          <Route path="drafts" element={<ProposalBuilderPage />} />
          <Route path="cases" element={<div className="p-8">My Cases (Coming Soon)</div>} />
          <Route path="dashboard" element={<div className="p-8">Dashboard (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

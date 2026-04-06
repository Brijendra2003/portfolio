import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AdminProvider } from './context/AdminContext';
import { EnquiryProvider } from './context/EnquiryContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import EnquiryModal from './components/common/EnquiryModal';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AdminProvider>
      <EnquiryProvider>
        <Router>
          <div className="min-h-screen bg-ink-900 noise-bg">
            <Navbar />
            <EnquiryModal />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:id" element={<ProjectDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#161625',
                color: '#e8e8f0',
                border: '1px solid rgba(212, 160, 23, 0.3)',
                borderRadius: '12px',
                fontFamily: 'DM Sans, sans-serif',
              },
              success: {
                iconTheme: { primary: '#d4a017', secondary: '#0f0f1a' },
              },
            }}
          />
        </Router>
      </EnquiryProvider>
    </AdminProvider>
  );
}

export default App;

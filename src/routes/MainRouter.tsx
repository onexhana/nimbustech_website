// src/routes/MainRouter.tsx
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import PortfolioPage from '../pages/PortfolioPage';
import ContactPage from '../pages/ContactPage';

// Admin 관련 import
import AdminLayout from '../pages/admin/AdminLayout';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminHome from '../pages/admin/AdminHome';
import AdminAbout from '../pages/admin/AdminAbout';
import AdminPortfolio from '../pages/admin/AdminPortfolio';
import AdminContact from '../pages/admin/AdminContact';
import AdminAssets from '../pages/admin/AdminAssets';
import AdminSettings from '../pages/admin/AdminSettings';

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* Admin 라우트 */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="portfolio" element={<AdminPortfolio />} />
        <Route path="contact" element={<AdminContact />} />
        <Route path="assets" element={<AdminAssets />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

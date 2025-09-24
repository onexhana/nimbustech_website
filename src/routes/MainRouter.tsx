// src/routes/MainRouter.tsx
import { Routes, Route } from 'react-router-dom';
import Header from '../components/common/Header';
import MainPage from '../pages/MainPage';

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
      {/* 메인 사이트 - 원래 구조로 복구 */}
      <Route path="/" element={
        <>
          <Header />
          <MainPage />
        </>
      } />
      
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

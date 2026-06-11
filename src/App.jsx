import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AppointmentPage from './pages/AppointmentPage'
import ServiceArticle from './pages/ServiceArticle'
import ServicesPage from './pages/ServicesPage'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/services/:slug" element={<ServiceArticle />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

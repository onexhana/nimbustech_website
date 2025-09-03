import React from 'react';
import HomeSection from '../components/Home/HomeSection';
import AboutSection from '../components/About/AboutSection';
import PortfolioSection from '../components/Portfolio/PortfolioSection';
import ContactSection from '../components/Contact/ContactSection';
import Footer from '../components/common/Footer';

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <main className="flex-grow">
        {/* Home Section */}
        <section 
          id="home" 
          className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HomeSection />
          </div>
        </section>

        {/* About Section */}
        <section 
          id="about" 
          className="w-full"
        >
          <AboutSection />
        </section>

        {/* Portfolio Section */}
        <section 
          id="portfolio" 
          className="w-full bg-white py-24"
        >
          <div className="w-full">
            <PortfolioSection />
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          className="w-full bg-gray-50 py-16 lg:py-24"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactSection />
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer id="footer" className="w-full bg-gray-900 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default MainPage;

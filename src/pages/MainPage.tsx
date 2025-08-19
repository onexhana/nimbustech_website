import React from 'react';
import HomeSection from '../components/Home/HomeSection';
import AboutSection from '../components/About/AboutSection';
import PortfolioSection from '../components/Portfolio/PortfolioSection';
import ContactSection from '../components/Contact/ContactSection';
import Footer from '../components/common/Footer';
import PortfolioCardList from '../components/Portfolio/PortfolioCardList';
import CategoryFilter from '../components/Portfolio/CategoryFilter';
import { portfolioProjects } from '../data/portfolioData';
import { useState } from 'react';

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("공공");
  const filtered = portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
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
        className="min-h-screen w-full bg-gray-50 py-16 lg:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutSection />
        </div>
      </section>

      {/* Portfolio Section */}
      <section 
        id="portfolio" 
        className="min-h-screen w-full bg-white py-16 lg:py-24"
      >
        <div className="w-full">
          {/* 포트폴리오 메인 섹션 */}
          <div className="pt-[100px] pl-4 pr-4 sm:pl-16 sm:pr-12 pb-24 bg-white">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start" style={{ marginLeft: '0px', '@media (min-width: 1024px)': { marginLeft: '64px' } }}>
              <div className="w-full lg:w-auto">
                <CategoryFilter 
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>

              <div className="flex-1 flex flex-col h-full lg:ml-[300px]">
                <h3 className="text-[28px] lg:text-[36px] font-extrabold mb-6 text-black tracking-tight">{selectedCategory}</h3>
                <div className="flex-1">
                  <PortfolioCardList projects={filtered} />
                </div>
              </div>
            </div>
          </div>

          {/* 파트너 로고 슬라이더 */}
          <div style={{ marginTop: "50px" }}>
            <PortfolioSection />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="min-h-screen w-full bg-gray-50 py-16 lg:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactSection />
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="w-full bg-gray-900 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default MainPage;

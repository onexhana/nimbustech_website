import HomeSection from '../components/Home/HomeSection';
import HomeButton from '../components/Home/HomeButton';
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
          className="w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white"
        >
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <HomeSection />
          </div>
        </section>

        {/* Home Button Section */}
        <section 
          id="home-buttons" 
          className="w-full bg-white py-6 md:py-16"
        >
          <div className="w-full max-w-[1920px] mx-auto">
            <HomeButton />
          </div>
        </section>

        {/* About Section */}
        <section 
          id="about" 
          className="w-full"
        >
          <div className="max-w-[1920px] mx-auto">
            <AboutSection />
          </div>
        </section>

        {/* Portfolio Section */}
        <section 
          id="portfolio" 
          className="w-full bg-white py-16"
        >
          <div className="w-full max-w-[1920px] mx-auto">
            <PortfolioSection />
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          className="w-full bg-gray-50 py-8 lg:py-16"
        >
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <ContactSection />
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer id="footer" className="w-full bg-gray-900 text-white">
        <div className="max-w-[1920px] mx-auto">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default MainPage;

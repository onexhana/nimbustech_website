import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HomeSection from '../components/Home/HomeSection';

function HomePage() {
  return (
    <>
      <Header />
      <HomeSection />
      <Footer />
    </>
  );
}

export default HomePage; // ✅ 이 줄이 있어야 함

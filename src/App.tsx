import { BrowserRouter } from 'react-router-dom';
import MainRouter from './routes/MainRouter';
import Header from './components/common/Header';
import Footer from './components/common/Footer'; // ✅ Footer 추가

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MainRouter />
      <Footer /> {/* ✅ 여기 추가 */}
    </BrowserRouter>
  );
}

export default App;

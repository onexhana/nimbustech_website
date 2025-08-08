import { BrowserRouter } from 'react-router-dom';
import MainRouter from './routes/MainRouter';
import Header from './components/common/Header';
import Footer from './components/common/Footer'; // ✅ Footer 추가

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MainRouter />
      <Footer /> {/* Footer 항상 렌더링 */}
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter } from 'react-router-dom';
import MainRouter from './routes/MainRouter';
import { HomeProvider } from './context/HomeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { AboutProvider } from './context/AboutContext';
import { ContactProvider } from './context/ContactContext';

function App() {
  return (
    <HomeProvider>
      <PortfolioProvider>
        <AboutProvider>
          <ContactProvider>
            <BrowserRouter>
              <div className="min-h-screen font-sans">
                <MainRouter />
              </div>
            </BrowserRouter>
          </ContactProvider>
        </AboutProvider>
      </PortfolioProvider>
    </HomeProvider>
  );
}

export default App;

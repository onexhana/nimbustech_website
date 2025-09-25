import { BrowserRouter } from 'react-router-dom';
import MainRouter from './routes/MainRouter';
import { HomeProvider } from './context/HomeContext';

function App() {
  return (
    <HomeProvider>
      <BrowserRouter>
        <div className="min-h-screen font-sans">
          <MainRouter />
        </div>
      </BrowserRouter>
    </HomeProvider>
  );
}

export default App;
